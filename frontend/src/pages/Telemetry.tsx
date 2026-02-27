import { MetricsCards } from '../components/MetricsCards';
import { MetricsData } from '../types';

interface TelemetryProps {
    metrics: MetricsData | undefined;
}

export const Telemetry = ({ metrics }: TelemetryProps) => {
    if (!metrics) return null;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase">DEVSYS Critical Telemetry</h2>
            </div>


            <MetricsCards metrics={metrics} />
        </div>
    );
};
