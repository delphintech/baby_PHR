import pool from '../config/db.js';

const Baby = {
	getAllBaby: async () => {
		try {
			const result = await pool.query('SELECT * FROM babies');
			return result.rows;
		} catch (error) {
			throw error;
		}
	},

	getBabybyId: async (id) => {
		try {
			if (!id) {
				throw new Error("An id is needed")
			}
			const result = await pool.query('SELECT * FROM babies WHERE id = $1', [id]);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	createBaby: async (name, birthdate, gender) => {
		if (!name || !birthdate || !gender) {
			throw new Error("name, birthdate and gender must not be null")
		}
		if (!['M', 'F', 'O'].includes(gender)) {
			throw new Error("Gender must be 'M', 'F' or 'O'")
		}
		try {
			const result = await pool.query('INSERT INTO babies (name, birthdate, gender) VALUES $1, $2, $3 RETURNING *', [name, birthdate, gender]);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	deleteBaby: async (id) => {
		try {
			const result = await pool.query('DELETE FROM babies WHERE id = $1', [id]);
			return true;
		} catch (error) {
			throw error;
		}
	},
}

export default Baby;


