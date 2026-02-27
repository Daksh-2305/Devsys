import { Pool } from 'pg';
import { config } from './env';

// For the mock service layer phase, we might not strictly need to connect yet,
// but we set it up to avoid refactoring later.
export const pool = new Pool(config.db);

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};
