import { Pool } from 'pg';

// PostgreSQL connection configuration
const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: '127.0.0.1',
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: 5432
});

export default {
	query: (text, params) => pool.query(text, params)
};