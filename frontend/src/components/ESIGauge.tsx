import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}


interface ESIGaugeProps {
    score: number;
    label: string;
    className?: string;
    animateDelay?: number;
}

export function ESIGauge({ score, label, className, animateDelay = 200 }: ESIGaugeProps) {
    const size = 200;
    const stroke = 14;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedScore(score);
        }, animateDelay);

        return () => clearTimeout(timeout);
    }, [score, animateDelay]);

    const offset = circumference - (animatedScore / 100) * circumference;

    const getColor = () => {
        if (score < 30) return "#ef4444"; // red
        if (score < 60) return "#eab308"; // yellow
        return "#22c55e"; // green
    };

    return (
        <div className={cn("w-[320px] h-[320px] bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center transition-all duration-700 mx-auto relative group hover:shadow-lg hover:-translate-y-1", className)}>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8 text-center transition-colors">{label}</h3>

            <div className="relative flex items-center justify-center">
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                        stroke="#f1f5f9"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />

                    <circle
                        stroke={getColor()}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                        style={{
                            transition: "stroke-dashoffset 1.2s ease-out",
                        }}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-6xl font-black tracking-tighter" style={{ color: getColor() }}>
                        {animatedScore.toFixed(1)}
                    </p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">/ 100</p>
                </div>
            </div>
        </div>
    );
}
