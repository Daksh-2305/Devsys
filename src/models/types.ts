export type MetricType =
    | 'co2'
    | 'temp_anomaly'
    | 'renewable_pct'
    | 'elec_demand'
    | 'extreme_events';

export interface MetricRecord {
    id?: number;
    timestamp: Date;
    metric_type: MetricType;
    value: number;
    metadata?: Record<string, any>;
}

export interface LiveMetricsUpdate {
    timestamp: string;
    metrics: Record<MetricType, number>;
}
