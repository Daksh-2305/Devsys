import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { MetricsService } from '../services/metrics.service';

export function setupWebSocket(server: Server) {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected to WebSocket for live metrics');

        // Send an initial payload on connect
        MetricsService.getLiveMetrics().then((metrics) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'LIVE_UPDATE', timestamp: new Date().toISOString(), metrics }));
            }
        }).catch(console.error);

        ws.on('close', () => {
            console.log('Client disconnected from WebSocket');
        });
    });

    return wss;
}

export async function broadcastLiveMetrics(wss: WebSocketServer) {
    if (wss.clients.size === 0) return;

    try {
        const metrics = await MetricsService.getLiveMetrics();
        const payload = JSON.stringify({
            type: 'LIVE_UPDATE',
            timestamp: new Date().toISOString(),
            metrics
        });

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(payload);
            }
        });
    } catch (error) {
        console.error('Error broadcasting metrics:', error);
    }
}
