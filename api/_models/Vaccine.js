import pool from '../_config/db.js';

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
	},

	createVaccine: async (baby_id, name, due_date, completed, completed_at, queryClient = null) => {
		const client = queryClient || pool;
		try {
			const result = await client.query(
				`INSERT INTO vaccinations (baby_id, name, due_date, completed, completed_at)
				VALUES ($1, $2, $3, $4, $5) RETURNING *`
				, [baby_id, name, due_date, completed, completed_at])
			return result.rows[0];
		} catch (error) {
			throw error
		}
	}
}

export default Vaccine;