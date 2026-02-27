import { Request, Response } from 'express';
import { MetricsService } from '../services/metrics.service';
import { MetricType } from '../models/types';

export class MetricsController {
    static async getLiveMetrics(req: Request, res: Response) {
        try {
            const metrics = await MetricsService.getLiveMetrics();
            const earth_stability_index = MetricsService.calculateESI(metrics);

            const responseData: any = {
                timestamp: new Date().toISOString(),
                metrics,
                earth_stability_index
            };

            const scenario = req.query.scenario as string;
            if (scenario) {
                const projection = MetricsService.projectTo2050(metrics, scenario);
                Object.assign(responseData, projection);
            }

            res.json({
                success: true,
                data: responseData
            });
        } catch (error) {
            console.error('Error fetching live metrics:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    static async getHistoricalMetrics(req: Request, res: Response) {
        try {
            const metric = req.query.metric as string;

            // Basic validation
            const validMetrics: MetricType[] = ['co2', 'temp_anomaly', 'renewable_pct', 'elec_demand', 'extreme_events'];

            if (!metric || !validMetrics.includes(metric as MetricType)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid or missing 'metric' query parameter. Supported metrics: ${validMetrics.join(', ')}`
                });
            }

            const data = await MetricsService.getHistoricalMetrics(metric as MetricType);

            res.json({
                success: true,
                data
            });
        } catch (error) {
            console.error('Error fetching historical metrics:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}
