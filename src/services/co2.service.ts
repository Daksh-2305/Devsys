import { MetricRecord } from '../models/types';

export class Co2Service {
    /**
     * Fetches the latest CO2 data from the Global Warming API.
     */
    static async getLiveCO2(): Promise<number> {
        try {
            const response = await fetch('https://global-warming.org/api/co2-api');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const co2Data = data.co2;

            if (co2Data && co2Data.length > 0) {
                // Get the last item's trend value
                const latest = co2Data[co2Data.length - 1];
                return parseFloat(latest.trend);
            }
            return 420.0; // Fallback
        } catch (error) {
            console.error('Error fetching real CO2 data:', error);
            // Fallback to mock data if API fails to avoid breaking the app
            return +(419.5 + Math.random() * 2).toFixed(2);
        }
    }

    /**
     * Fetches historical CO2 data from the Global Warming API
     * and formats it as MetricRecords.
     */
    static async getHistoricalCO2(): Promise<MetricRecord[]> {
        try {
            const response = await fetch('https://global-warming.org/api/co2-api');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const co2Data = data.co2;

            // Take the last 30 entries (approx 30 months)
            const recentData = co2Data.slice(-30);

            return recentData.map((item: any) => ({
                timestamp: new Date(`${item.year}-${item.month.padStart(2, '0')}-${item.day.padStart(2, '0')}`),
                metric_type: 'co2',
                value: parseFloat(item.trend)
            }));
        } catch (error) {
            console.error('Error fetching historical CO2 data:', error);
            return [];
        }
    }
}
