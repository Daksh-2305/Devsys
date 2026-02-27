import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, TrendingUp, BarChart3, RefreshCw } from 'lucide-react';

interface NavbarProps {
    onRefresh: () => void;
    isRefreshing: boolean;
    timestamp?: string | number | Date;
}

export const Navbar = ({ onRefresh, isRefreshing, timestamp }: NavbarProps) => {
    const navItems = [
        { to: "/overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
        { to: "/telemetry", label: "Telemetry", icon: <Activity className="w-4 h-4" /> },
        { to: "/trajectory", label: "Trajectory", icon: <TrendingUp className="w-4 h-4" /> },
        { to: "/analysis", label: "Analysis", icon: <BarChart3 className="w-4 h-4" /> },
    ];

    return (
        <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm py-4 px-8 mb-10 overflow-hidden">
            <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-8">
                    <Link to="/overview" className="flex items-center space-x-3 group active:scale-95 transition-transform">
                        <div className="bg-indigo-50 p-2 rounded-xl border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
                            <Activity className="w-5 h-5 text-indigo-600" />
                        </div>
                        <span className="font-bold text-2xl tracking-tighter text-slate-900">
                            DEVSYS
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center space-x-5 border-l border-slate-200 pl-8">
                        <span className="text-xs font-mono font-bold text-slate-500 flex items-center tracking-[0.2em] uppercase">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-3 animate-pulse"></span>
                            SYSTEM-LIVE: {timestamp ? new Date(timestamp).toLocaleTimeString() : '--:--:--'}
                        </span>

                        <button
                            onClick={onRefresh}
                            disabled={isRefreshing}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all group active:scale-90"
                            title="Manual Refresh"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-600' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `
                flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                ${isActive
                                    ? "text-indigo-600 bg-indigo-50 shadow-sm"
                                    : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"}
              `}
                        >
                            <span className="hidden sm:inline">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};
