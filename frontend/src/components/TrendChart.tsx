import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { MetricsData } from '../types';

interface TrendChartProps {
    currentMetrics: MetricsData;
    bauMetrics: MetricsData;
    sustainableMetrics: MetricsData;
}

export const TrendChart = ({ currentMetrics, bauMetrics, sustainableMetrics }: TrendChartProps) => {
    const currentYear = new Date().getFullYear();

    // Transform data for Recharts to show branching divergence from current year to 2050
    const data = [
        {
            year: currentYear.toString(),
            'CO2 (BAU)': currentMetrics.co2,
            'CO2 (Sust)': currentMetrics.co2,
            'Temp (BAU)': currentMetrics.temp_anomaly,
            'Temp (Sust)': currentMetrics.temp_anomaly,
            'Renewables (BAU)': currentMetrics.renewable_pct,
            'Renewables (Sust)': currentMetrics.renewable_pct,
        },
        {
            year: '2050',
            'CO2 (BAU)': bauMetrics.co2,
            'CO2 (Sust)': sustainableMetrics.co2,
            'Temp (BAU)': bauMetrics.temp_anomaly,
            'Temp (Sust)': sustainableMetrics.temp_anomaly,
            'Renewables (BAU)': bauMetrics.renewable_pct,
            'Renewables (Sust)': sustainableMetrics.renewable_pct,
        }
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm h-[450px] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-slate-500 text-sm font-bold tracking-widest uppercase mb-7">Projection Divergence (2024 - 2050)</h3>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="year" stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} fontSize={12} />
                    <YAxis yAxisId="left" stroke="#94a3b8" tickLine={false} axisLine={false} dx={-10} fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tickLine={false} axisLine={false} dx={10} fontSize={12} />

                    <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#1e293b', fontSize: '13px', fontWeight: '600' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: '600', color: '#64748b' }} />

                    <Line yAxisId="left" type="monotone" dataKey="CO2 (BAU)" stroke="#f59e0b" strokeWidth={3} strokeDasharray="6 4" dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 6 }} />
                    <Line yAxisId="left" type="monotone" dataKey="CO2 (Sust)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />

                    <Line yAxisId="left" type="monotone" dataKey="Temp (BAU)" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 3, fill: '#ef4444' }} />
                    <Line yAxisId="left" type="monotone" dataKey="Temp (Sust)" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: '#22c55e' }} />

                    <Line yAxisId="right" type="monotone" dataKey="Renewables (BAU)" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                    <Line yAxisId="right" type="monotone" dataKey="Renewables (Sust)" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
