import { ProjectionComparison } from '../components/ProjectionComparison';
import { MetricsData } from '../types';

interface AnalysisProps {
    metrics: MetricsData | undefined;
    bauMetrics: MetricsData | undefined;
    sustMetrics: MetricsData | undefined;
}

export const Analysis = ({ metrics, bauMetrics, sustMetrics }: AnalysisProps) => {
    if (!metrics || !bauMetrics || !sustMetrics) return null;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase">DEVSYS Scenario Intelligence</h2>
            </div>


            <ProjectionComparison
                currentMetrics={metrics}
                bauMetrics={bauMetrics}
                sustainableMetrics={sustMetrics}
            />
        </div>
    );
};
