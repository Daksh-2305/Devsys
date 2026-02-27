import { MetricsData } from '../types';
import { Activity, Thermometer, Wind, Zap, AlertTriangle } from 'lucide-react';

interface MetricsCardsProps {
    metrics: MetricsData;
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
    const cards = [
        {
            title: "CO2 Levels",
            value: `${metrics.co2} ppm`,
            icon: <Wind className="w-6 h-6 text-sky-400 opacity-80" />,
            desc: "Atmospheric Concentration"
        },
        {
            title: "Temp Anomaly",
            value: `+${metrics.temp_anomaly} °C`,
            icon: <Thermometer className="w-6 h-6 text-rose-400 opacity-80" />,
            desc: "Global Average Increase"
        },
        {
            title: "Renewable Energy",
            value: `${metrics.renewable_pct}%`,
            icon: <Zap className="w-6 h-6 text-emerald-400 opacity-80" />,
            desc: "Grid Share"
        },
        {
            title: "Elec Demand",
            value: `${metrics.elec_demand} TWh`,
            icon: <Activity className="w-6 h-6 text-indigo-400 opacity-80" />,
            desc: "Annual Consumption"
        },
        {
            title: "Extreme Events",
            value: metrics.extreme_events,
            icon: <AlertTriangle className="w-6 h-6 text-amber-500 opacity-80" />,
            desc: "Major scale incidents"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {cards.map((card, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">{card.title}</span>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                            {card.icon}
                        </div>
                    </div>
                    <div className="relative z-10">
                        <div className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
                            {card.value}
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            {card.desc}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
