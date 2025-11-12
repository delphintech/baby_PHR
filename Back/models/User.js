import pool from '../config/db.js';

const User = {
	getAll: async () => {
		try {
			const result = await pool.query('SELECT * FROM users');
			return result.rows;
		} catch (error) {
			throw error;
		}
	}
}

export default User;