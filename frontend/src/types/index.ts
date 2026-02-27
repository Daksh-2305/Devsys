export interface LiveMetricsResponse {
    success: boolean;
    data: {
        timestamp: string;
        metrics: {
            co2: number;
            temp_anomaly: number;
            renewable_pct: number;
            elec_demand: number;
            extreme_events: number;
        };
        earth_stability_index: number;
        projected_metrics?: {
            co2: number;
            temp_anomaly: number;
            renewable_pct: number;
            elec_demand: number;
            extreme_events: number;
        };
        projected_earth_stability_index?: number;
        scenario?: string;
    };
}

export type MetricsData = LiveMetricsResponse['data']['metrics'];
