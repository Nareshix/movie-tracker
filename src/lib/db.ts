import { DATABASE_URL } from '$env/static/private';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: DATABASE_URL
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = async (text: string, params?: any[]) => {
	return pool.query(text, params);
};
