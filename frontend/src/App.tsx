import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { fetchLiveMetrics } from './services/api';
import { LiveMetricsResponse } from './types';
import { Navbar } from './components/Navbar';
import { Welcome } from './pages/Welcome';
import { Overview } from './pages/Overview';
import { Telemetry } from './pages/Telemetry';
import { Trajectory } from './pages/Trajectory';
import { Analysis } from './pages/Analysis';
import { Globe2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';


function App() {
  const [dataBAU, setDataBAU] = useState<LiveMetricsResponse['data'] | null>(null);
  const [dataSust, setDataSust] = useState<LiveMetricsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const loadData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      if (!dataBAU && !isRefresh) setLoading(true);

      const [resBAU, resSust] = await Promise.all([
        fetchLiveMetrics('bau'),
        fetchLiveMetrics('sustainable')
      ]);

      setDataBAU(resBAU.data);
      setDataSust(resSust.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch metrics data. Ensure backend is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData(true);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !dataBAU) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-fade-in flex flex-col items-center">
          <Globe2 className="w-20 h-20 text-indigo-600 mb-8 animate-spin-slow" />
          <p className="text-slate-500 text-base font-bold tracking-widest uppercase">Initializing Telemetry Systems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-red-50 border border-red-100 p-10 rounded-2xl max-w-xl text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-600">System Critical Error</h2>
          <p className="text-base text-red-500 mb-8">{error}</p>
          <button
            onClick={() => loadData()}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-base font-bold tracking-widest uppercase transition-all shadow-md active:scale-95"
          >
            Re-initialize Core
          </button>
        </div>
      </div>
    );
  }

  const currentESI = dataBAU?.earth_stability_index || 0;

  const location = useLocation();
  const showNavbar = location.pathname !== '/' || hasEntered;

  if (!hasEntered) {
    return <Welcome onEnter={() => setHasEntered(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8fafc] to-[#eef2ff] flex flex-col relative overflow-hidden selection:bg-indigo-500/30">

      <div className="relative z-10 flex flex-col min-h-screen">
        {showNavbar && (
          <Navbar
            onRefresh={() => loadData(true)}
            isRefreshing={refreshing}
            timestamp={dataBAU?.timestamp}
          />
        )}

        <main className={showNavbar ? "flex-1 w-full max-w-7xl mx-auto px-6 pb-12" : "flex-1"}>
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<Overview currentESI={currentESI} />} />
            <Route path="/telemetry" element={<Telemetry metrics={dataBAU?.metrics} />} />
            <Route path="/trajectory" element={
              <Trajectory
                metrics={dataBAU?.metrics}
                bauMetrics={dataBAU?.projected_metrics}
                sustMetrics={dataSust?.projected_metrics}
                bauESI={dataBAU?.projected_earth_stability_index || 0}
                sustESI={dataSust?.projected_earth_stability_index || 0}
              />
            } />
            <Route path="/analysis" element={
              <Analysis
                metrics={dataBAU?.metrics}
                bauMetrics={dataBAU?.projected_metrics}
                sustMetrics={dataSust?.projected_metrics}
              />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}


export default App;
