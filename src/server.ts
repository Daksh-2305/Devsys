import express from 'express';
import cors from 'cors';
import http from 'http';
import { config } from './config/env';

import metricsRoutes from './routes/metrics.routes';
import healthRoutes from './routes/health.routes';
import { setupWebSocket, broadcastLiveMetrics } from './websocket/ws';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/metrics', metricsRoutes);
app.use('/health', healthRoutes);

// Create HTTP Server
const server = http.createServer(app);

// Setup WebSocket
const wss = setupWebSocket(server);

// Broadcast live metrics every 5 seconds
const BROADCAST_INTERVAL = 5000;
setInterval(() => {
    broadcastLiveMetrics(wss);
}, BROADCAST_INTERVAL);

// Start server
server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    console.log(`WebSocket server attached on same port: ${config.port}`);
});
