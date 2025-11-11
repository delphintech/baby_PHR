const pool = require('../config/db');

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

module.exports = User;