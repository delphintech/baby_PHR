import pool from '../config/db.js';

const Record = {
	getAllRecords: async () => {
		try {
			const result = await pool.query("SELECT * FROM health_records")
			return result.rows;
		} catch (error) {
			throw error;
		}
	},

	getBabyRecords: async (id) => {
		try {
			const result = await pool.query("SELECT * FROM health_records WHERE baby_id = $1 ORDER BY date DESC", [id]);
			console.log(result.rows)
			return result.rows;
		} catch (error) {
			throw error;
		}
	}
}

export default Record;
