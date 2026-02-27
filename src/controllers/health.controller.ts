import { Request, Response } from 'express';
import { pool } from '../config/db';

export class HealthController {
    static async check(req: Request, res: Response) {
        let dbStatus = 'disconnected';
        try {
            // Just a simple query to ensure DB is reachable
            // We will suppress error logs for healthcheck by standard ways,
            // but if the DB isn't running, this will correctly report disconnected.
            await pool.query('SELECT 1');
            dbStatus = 'connected';
        } catch (e) {
            dbStatus = 'error';
        }

        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            services: {
                database: dbStatus
            }
        });
    }
}
