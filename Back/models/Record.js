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
			return result.rows;
		} catch (error) {
			throw error;
		}
	},

	createRecord: async (baby_id, date, weight, innerHeight, notes) => {
		try {
			const result = await pool.query("INSERT INTO health_records (baby_id, date, weight, height, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *", [baby_id, date, weight, innerHeight, notes])
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	deleteRecord: async (id) => {
		try {
			const result = await pool.query('DELETE FROM health_records WHERE id = $1', [id]);
			return true;
		} catch (error) {
			throw error;
		}
	},


	getBabyMetrics: async (id, metric) => {
		if (!['height', 'weight'].includes(metric)) {
            throw new Error("Metric must be 'height' or 'weight'");
        }
		try {
			const result = await pool.query(
				`SELECT h.${metric},
					((EXTRACT(year FROM AGE(h.date, b.birthdate)) * 12 
					+ EXTRACT(month FROM AGE(h.date, b.birthdate)))
					)::int AS months
				FROM health_records h
				JOIN babies b ON h.baby_id = b.id
				WHERE h.baby_id = $1
				ORDER BY h.date ASC`, [id]
			);
			return result.rows;
		} catch (error) {
			throw error;
		}
	},

	getBabyAvgHeightGain: async (id) => {
		try {
			const result = await pool.query(
				`WITH monthly AS (
					SELECT h.height,
						((EXTRACT(year FROM AGE(h.date, b.birthdate)) * 12 
						+ EXTRACT(month FROM AGE(h.date, b.birthdate)))
						)::int AS months
					FROM health_records h
					JOIN babies b ON h.baby_id = b.id
					WHERE h.baby_id = $1
				),
				per_month AS (
					SELECT months, AVG(height) AS month_height
					FROM monthly
					GROUP BY months
				),
				deltas AS (
					SELECT months,
						month_height - LAG(month_height) OVER (ORDER BY months) AS gain
					FROM per_month
				)
				SELECT ROUND(COALESCE(AVG(gain), 0)::numeric, 2) AS avg_monthly_gain
				FROM deltas;`
				, [id]
			);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	getBabyAvgWeightGain: async (id) => {
		try {
			const result = await pool.query(
				`WITH monthly AS (
					SELECT h.weight,
						((EXTRACT(year FROM AGE(h.date, b.birthdate)) * 12 
						+ EXTRACT(month FROM AGE(h.date, b.birthdate)))
						)::int AS months
					FROM health_records h
					JOIN babies b ON h.baby_id = b.id
					WHERE h.baby_id = $1
				),
				per_month AS (
					SELECT months, AVG(weight) AS month_weight
					FROM monthly
					GROUP BY months
				),
				deltas AS (
					SELECT months,
						month_weight - LAG(month_weight) OVER (ORDER BY months) AS gain
					FROM per_month
				)
				SELECT ROUND(COALESCE(AVG(gain), 0)::numeric, 2) AS avg_monthly_gain
				FROM deltas;`
				, [id]
			);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	getAllAvgHeightGain: async (id) => {
		try {
			const result = await pool.query(
				`SELECT h.weight,
					((EXTRACT(year FROM AGE(h.date, b.birthdate)) * 12 
					+ EXTRACT(month FROM AGE(h.date, b.birthdate)))
					)::int AS months
				FROM health_records h
				JOIN babies b ON h.baby_id = b.id
				WHERE h.baby_id = $1
				ORDER BY h.date ASC`, [id]
			);
			return result.rows;
		} catch (error) {
			throw error;
		}
	}

}

export default Record;
