import { Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface WelcomeProps {
    onEnter: () => void;
}

export const Welcome = ({ onEnter }: WelcomeProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#f8fafc] to-[#eef2ff] text-slate-900 overflow-hidden relative">
            <div className="z-10 flex flex-col items-center text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                {/* Logo / Icon */}
                <div className="mb-10 relative">
                    <div className="bg-indigo-50 p-6 rounded-[2.5rem] border border-indigo-100 shadow-sm animate-bounce-slow">
                        <Activity className="w-16 h-16 text-indigo-600" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-slate-900">
                    WELCOME TO <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">DEVSYS</span>
                </h1>

                {/* Subtext */}
                <p className="text-xl md:text-2xl text-slate-500 font-semibold tracking-[0.2em] uppercase mb-12">
                    Daksh Khandal
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
                    <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-bold tracking-wider uppercase text-slate-600 shadow-sm">
                        <ShieldCheck className="w-4 h-4 text-indigo-600" /> Integrity
                    </span>
                    <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-bold tracking-wider uppercase text-slate-600 shadow-sm">
                        <Zap className="w-4 h-4 text-indigo-600" /> Performance
                    </span>
                    <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-bold tracking-wider uppercase text-slate-600 shadow-sm">
                        <Activity className="w-4 h-4 text-indigo-600" /> Real-time
                    </span>
                </div>

                {/* Action */}
                <button
                    onClick={onEnter}
                    className="group relative inline-flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-2xl text-xl font-bold tracking-widest uppercase transition-all hover:scale-105 shadow-md hover:shadow-xl hover:bg-indigo-500 active:scale-95 overflow-hidden cursor-pointer"
                >
                    <span className="relative z-10">Enter</span>
                    <ArrowRight className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-2" />
                </button>
            </div>
        </div>
    );
};
