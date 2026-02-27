import { MetricsData } from '../types';
import { TrendingUp, TrendingDown, Leaf, Factory } from 'lucide-react';
import { cn } from './ESIGauge';

interface ProjectionComparisonProps {
    currentMetrics: MetricsData;
    bauMetrics: MetricsData;
    sustainableMetrics: MetricsData;
}

export const ProjectionComparison = ({ currentMetrics, bauMetrics, sustainableMetrics }: ProjectionComparisonProps) => {

    const rows = [
        { key: 'co2', label: 'CO2 Levels', unit: 'ppm', reverseGood: true },
        { key: 'temp_anomaly', label: 'Temp Anomaly', unit: '°C', reverseGood: true },
        { key: 'renewable_pct', label: 'Renewables', unit: '%', reverseGood: false },
        { key: 'elec_demand', label: 'Elec Demand', unit: 'TWh', reverseGood: true },
        { key: 'extreme_events', label: 'Extreme Events', unit: 'incidents', reverseGood: true },
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="p-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-slate-900 text-base font-bold tracking-tight uppercase">DEVSYS Scenario Intelligence</h3>

                <div className="flex gap-4">
                    <span className="flex items-center text-xs font-bold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                        <Factory className="w-3.5 h-3.5 mr-2" /> BAU
                    </span>
                    <span className="flex items-center text-xs font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                        <Leaf className="w-3.5 h-3.5 mr-2" /> SUSTAINABLE
                    </span>
                </div>
            </div>

            <div className="divide-y divide-slate-100">
                {/* Header Row */}
                <div className="grid grid-cols-4 sm:grid-cols-5 p-4 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                    <div className="sm:col-span-2">Systemic Metric</div>
                    <div className="text-right">2024 Baseline</div>
                    <div className="text-right">2050 (Regime A)</div>
                    <div className="text-right">2050 (Regime B)</div>
                </div>

                {rows.map((row) => {
                    const current = Number(currentMetrics[row.key as keyof MetricsData]);
                    const bau = Number(bauMetrics[row.key as keyof MetricsData]);
                    const sust = Number(sustainableMetrics[row.key as keyof MetricsData]);

                    const isSustBetterThanBau = row.reverseGood ? sust < bau : sust > bau;
                    const diff = Math.abs(sust - bau);

                    return (
                        <div key={row.key} className="grid grid-cols-4 sm:grid-cols-5 p-5 px-8 items-center hover:bg-slate-50 transition duration-300">
                            <div className="sm:col-span-2 flex flex-col">
                                <span className="text-sm font-semibold text-slate-800">{row.label}</span>
                                <span className="text-[10px] flex flex-row items-center mt-1">
                                    <span className={cn(
                                        "font-bold flex items-center",
                                        isSustBetterThanBau ? "text-emerald-600" : "text-amber-600"
                                    )}>
                                        {row.reverseGood ?
                                            (sust < current ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />)
                                            :
                                            (sust > current ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />)
                                        }
                                        {diff.toFixed(1)} {row.unit} diff
                                    </span>
                                </span>
                            </div>

                            <div className="text-right text-base text-slate-600 font-bold">
                                {current.toFixed(1)} <span className="text-[10px] text-slate-400 hidden sm:inline">{row.unit}</span>
                            </div>

                            <div className="text-right text-base font-bold text-amber-600">
                                {bau.toFixed(1)}
                            </div>

                            <div className={cn(
                                "text-right text-base font-bold",
                                isSustBetterThanBau ? "text-emerald-600" : "text-slate-800"
                            )}>
                                {sust.toFixed(1)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
