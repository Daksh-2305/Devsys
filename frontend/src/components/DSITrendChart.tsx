import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface DSITrendChartProps {
    data: { name: string; score: number }[];
}

export const DSITrendChart = ({ data }: DSITrendChartProps) => {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm h-[350px] animate-fade-in-up">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                        fontSize={12}
                        fontWeight="500"
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                        fontSize={12}
                        fontWeight="500"
                        domain={[0, 100]}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            borderColor: '#e2e8f0',
                            color: '#1e293b',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            fontSize: '13px',
                            fontWeight: '600'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
