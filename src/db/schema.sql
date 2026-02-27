-- Time-series optimized schema using standard PostgreSQL
-- Best practice for time-series in vanilla PG:
-- 1. Index on timestamp
-- 2. Partition by time (e.g., monthly) if data grows large. Here we use standard tables with indexes.

CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metric_type VARCHAR(50) NOT NULL, -- e.g., 'co2', 'temp_anomaly', 'renewable_pct', 'elec_demand', 'extreme_events'
    value DOUBLE PRECISION NOT NULL,
    metadata JSONB -- Optional metadata mapping specific to the metric
);

-- Index for time-series queries
CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON metrics (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_type_timestamp ON metrics (metric_type, timestamp DESC);

-- Example optimized table if we separate them:
-- For extremely high volume, you might create separate tables per metric or utilize TimescaleDB extension.
-- Here we'll stick to a unified table for simplicity, which works well up to millions of rows with the composite index.
