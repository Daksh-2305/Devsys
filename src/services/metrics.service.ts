import { MetricType, MetricRecord } from '../models/types';
import { Co2Service } from './co2.service';

export class MetricsService {
    // Mock implementations with real CO2 data

    static async getLiveMetrics(): Promise<Record<MetricType, number>> {
        // Fetch real CO2 data
        const liveCo2 = await Co2Service.getLiveCO2();

        // Generate some mock live data for other metrics
        return {
            co2: liveCo2,
            temp_anomaly: +(1.1 + Math.random() * 0.1).toFixed(2),
            renewable_pct: +(29.5 + Math.random() * 1.5).toFixed(2),
            elec_demand: +(25000 + Math.random() * 500).toFixed(0),
            extreme_events: Math.floor(Math.random() * 5)
        };
    }

    static async getHistoricalMetrics(metric: MetricType): Promise<MetricRecord[]> {
        // If metric is CO2, fetch from real API
        if (metric === 'co2') {
            const realData = await Co2Service.getHistoricalCO2();
            if (realData.length > 0) {
                return realData;
            }
            // Fallback to mock data if realAPI fails
        }

        // Generate some mock historical data for the last 30 days
        const data: MetricRecord[] = [];
        const now = new Date();

        for (let i = 30; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);

            let baseValue = 0;
            switch (metric) {
                case 'co2': baseValue = 415; break;
                case 'temp_anomaly': baseValue = 1.0; break;
                case 'renewable_pct': baseValue = 20; break;
                case 'elec_demand': baseValue = 24000; break;
                case 'extreme_events': baseValue = 1; break;
            }

            data.push({
                timestamp: date,
                metric_type: metric,
                value: +(baseValue + Math.random() * (baseValue * 0.1)).toFixed(2)
            });
        }

        return data;
    }

    /**
     * Calculates the Earth Stability Index (ESI) based on current metrics.
     * ESI is a score from 0 to 100 where 100 is optimal stability.
     */
    static calculateESI(metrics: Record<MetricType, number>): number {
        const clamp = (val: number, min: number = 0, max: number = 100) => Math.max(min, Math.min(max, val));

        // Normalize CO2 relative to 350-500 ppm
        const co2Risk = clamp(((metrics.co2 - 350) / (500 - 350)) * 100);

        // Normalize Temperature anomaly relative to 2°C
        const tempRisk = clamp((metrics.temp_anomaly / 2) * 100);

        // Normalize Renewable energy inverse risk relative to 80%
        const renewableRisk = clamp(((80 - metrics.renewable_pct) / 80) * 100);

        // Normalize Electricity demand relative to 20000-40000 range
        const elecRisk = clamp(((metrics.elec_demand - 20000) / (40000 - 20000)) * 100);

        // Normalize Extreme events relative to 10-event threshold
        const eventsRisk = clamp((metrics.extreme_events / 10) * 100);

        // Apply weights
        const totalRisk =
            co2Risk * 0.30 +
            tempRisk * 0.25 +
            renewableRisk * 0.20 +
            elecRisk * 0.15 +
            eventsRisk * 0.10;

        // Compute ESI
        const esi = 100 - totalRisk;

        // Return ESI rounded to 2 decimals
        return Math.round(esi * 100) / 100;
    }

    /**
     * Projects the given metrics to the year 2050 based on the provided scenario.
     */
    static projectTo2050(metrics: Record<MetricType, number>, scenario: string) {
        const currentYear = new Date().getFullYear();
        const yearsRemaining = Math.max(0, 2050 - currentYear);

        let co2GrowthAnnual = 2.4;
        let tempGrowthAnnual = 0.02;
        let renewableGrowthAnnual = 1.5;
        const elecGrowthAnnual = 0.02; // 2% compound
        const eventsGrowthAnnual = 0.1;

        if (scenario === 'sustainable') {
            co2GrowthAnnual *= (1 - 0.60); // Reduce by 60%
            tempGrowthAnnual *= (1 - 0.40); // Reduce by 40%
            renewableGrowthAnnual *= (1 + 0.80); // Increase by 80%
        }

        const projected_metrics: Record<MetricType, number> = {
            co2: +(metrics.co2 + (co2GrowthAnnual * yearsRemaining)).toFixed(2),
            temp_anomaly: +(metrics.temp_anomaly + (tempGrowthAnnual * yearsRemaining)).toFixed(2),
            // Cap renewable percentage at 100
            renewable_pct: Math.min(100, +(metrics.renewable_pct + (renewableGrowthAnnual * yearsRemaining)).toFixed(2)),
            // Electricity demand grows at compound rate
            elec_demand: +(metrics.elec_demand * Math.pow(1 + elecGrowthAnnual, yearsRemaining)).toFixed(0),
            extreme_events: +(metrics.extreme_events + (eventsGrowthAnnual * yearsRemaining)).toFixed(1)
        };

        const projected_earth_stability_index = this.calculateESI(projected_metrics);

        return {
            projected_metrics,
            projected_earth_stability_index,
            scenario
        };
    }
}
