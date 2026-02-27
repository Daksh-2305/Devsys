import { ESIGauge } from '../components/ESIGauge';
import { DSITrendChart } from '../components/DSITrendChart';
import { Sparkles } from 'lucide-react';

interface OverviewProps {
    currentESI: number;
}

export const Overview = ({ currentESI }: OverviewProps) => {
    // Mock trend data
    const trendData = [
        { name: 'Jan', score: 45 },
        { name: 'Feb', score: 48 },
        { name: 'Mar', score: 52 },
        { name: 'Apr', score: 50 },
        { name: 'May', score: 55 },
        { name: 'Jun', score: currentESI },
    ];

    return (
        <div className="space-y-10 animate-fade-in py-8">
            {/* Top Section: Main DSI Gauge */}
            <section className="flex flex-col items-center justify-center">
                <ESIGauge
                    score={currentESI}
                    label="Dev Stability Index (DSI)"
                    animateDelay={200}
                />
            </section>

            {/* Trend and Insights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* DSI Trend Chart */}
                <section className="lg:col-span-2 space-y-4">
                    <h3 className="text-slate-900 text-lg font-bold tracking-tight">Development Trend</h3>
                    <DSITrendChart data={trendData} />
                </section>

                {/* AI Insights Card */}
                <section className="space-y-4">
                    <h3 className="text-slate-900 text-lg font-bold tracking-tight">Insights</h3>
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm h-[350px] overflow-y-auto">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-indigo-100 p-2 rounded-lg">
                                <Sparkles className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">System Intelligence</span>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3 flex-shrink-0"></span>
                                <p className="text-slate-600 text-sm leading-relaxed">System stability has increased by <span className="text-indigo-600 font-bold">5.4%</span> over the last 30 days due to improved renewable integration.</p>
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3 flex-shrink-0"></span>
                                <p className="text-slate-600 text-sm leading-relaxed">CO2 concentration shows a <span className="text-amber-600 font-bold">minor deceleration</span> in growth trend across major nodes.</p>
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3 flex-shrink-0"></span>
                                <p className="text-slate-600 text-sm leading-relaxed">Recommended action: Optimize grid distribution in Sector 4 to mitigate temp anomaly spikes.</p>
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3 flex-shrink-0"></span>
                                <p className="text-slate-600 text-sm leading-relaxed">Alert: Extreme event probability remains <span className="text-slate-900 font-bold">nominal</span> for the upcoming cycle.</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};
