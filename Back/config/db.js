import { Pool } from 'pg';

// PostgreSQL connection configuration
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export default pool;

// export default {
// 	query: (text, params) => pool.query(text, params)
// };