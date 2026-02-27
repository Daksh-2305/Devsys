import { LiveMetricsResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export const fetchLiveMetrics = async (scenario?: 'bau' | 'sustainable'): Promise<LiveMetricsResponse> => {
    const url = new URL(`${API_BASE_URL}/metrics/live`);
    if (scenario) {
        url.searchParams.append('scenario', scenario);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error('Failed to fetch metrics');
    }

    return response.json();
};
