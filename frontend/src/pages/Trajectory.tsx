import { TrendChart } from '../components/TrendChart';
import { ESIGauge } from '../components/ESIGauge';
import { MetricsData } from '../types';

interface TrajectoryProps {
    metrics: MetricsData | undefined;
    bauMetrics: MetricsData | undefined;
    sustMetrics: MetricsData | undefined;
    bauESI: number;
    sustESI: number;
}

export const Trajectory = ({ metrics, bauMetrics, sustMetrics, bauESI, sustESI }: TrajectoryProps) => {
    if (!metrics || !bauMetrics || !sustMetrics) return null;

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase">DEVSYS Trajectory Modeling</h2>
            </div>



            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <TrendChart
                    currentMetrics={metrics}
                    bauMetrics={bauMetrics}
                    sustainableMetrics={sustMetrics}
                />

                <div className="flex flex-col gap-8">
                    <h3 className="text-textsec text-xs font-semibold tracking-wide uppercase text-center">Projected ESI Divergence</h3>
                    <div className="grid md:grid-cols-2 gap-8 justify-items-center">
                        <ESIGauge
                            score={bauESI}
                            label="BAU 2050"
                            animateDelay={500}
                        />
                        <ESIGauge
                            score={sustESI}
                            label="Sustainable 2050"
                            animateDelay={700}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
