import pool from '../config/db.js';

const Vaccine = {
	getAllVaccines: async () => {
		try {
			const result = await pool.query("SELECT * FROM vaccinations")
			return result.rows;
		} catch (error) {
			throw error;
		}
	},

	getBabyVaccines: async (id) => {
		try {
			const result = await pool.query("SELECT * FROM vaccinations WHERE baby_id = $1 ORDER BY due_date ASC", [id]);
			return result.rows;
		} catch (error) {
			throw error;
		}
	},

	updateVaccine: async (id, completed, completed_at) => {
		try {
			const result = await pool.query('UPDATE vaccinations SET completed = $1, completed_at = $2 WHERE id = $3', [completed, completed_at, id]);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	}
}

export default Vaccine;