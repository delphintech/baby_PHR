import Baby from '../models/Baby.js';
import Vaccine from '../models/Vaccine.js';
import pool from '../config/db.js';

const babyController = {
	getAllBaby: async (req, res) => {
		try {
		const babies = await Baby.getAllBaby();
		res.json({ status: 'ok', data: babies });
		} catch (error) {
			res.status(500).json({ status: 'error', message: error.message });
		}
	},

	getBabybyId: async (req, res) => {
		try {
			const baby = await Baby.getBabybyId(req.params.id);
			res.json({ status: 'ok', data: baby})
		} catch (error) {
			res.status(500).json({ status: 'error', message: error.message });
		}
	},

	createBaby: async (req, res) => {
		const { name, birthdate, gender } = req.body;
		if (!name || !birthdate || !gender) {
			return res.status(400).json({ status: 'error', message: 'Missing required fields' });
		}

		const client = await pool.connect();
		try {
			await client.query('BEGIN')

			const baby = await Baby.createBaby(name, birthdate, gender, client);

			const vaccines = [
				{	name: 'RSV', dueMonth: 0 },
				{	name: 'Hepatitis B', dueMonth: 0 },
				{	name: '2nd Hepatitis B', dueMonth: 2 },
				{	name: 'Rotavirus', dueMonth: 2 },
				{	name: 'Pneumococcal', dueMonth: 2 },
				{	name: 'Polio', dueMonth: 2 },
				{	name: '2nd Rotavirus', dueMonth: 4 },
				{	name: '2nd Pneumococcal', dueMonth: 4 },
				{	name: '2nd Polio', dueMonth: 4 },
				{	name: '3rd Hepatitis B', dueMonth: 6 },
				{	name: '3rd Rotavirus', dueMonth: 6 },
				{	name: '3rd Pneumococcal', dueMonth: 6 },
				{	name: '3rd Polio', dueMonth: 6 },
				{	name: 'MMR', dueMonth: 12 },
				{	name: 'Varicella', dueMonth: 15 }
			]

			for (const vaccine of vaccines) {
				const dueDate = new Date(baby.birthdate);
				dueDate.setMonth(dueDate.getMonth() + vaccine.dueMonth)
				const dueISO = dueDate.toISOString().slice(0,10);
				await Vaccine.createVaccine(baby.id, vaccine.name, dueISO, false, null, client)
			}

			await client.query('COMMIT')
			res.json({ status: 'ok', data: baby })
		} catch (error) {
			await client.query('ROLLBACK')
			res.status(500).json({ status: 'error', message: error.message });
		} finally {
			client.release();
		}
	},

	deleteBaby: async (req, res) => {
		try {
			await Baby.deleteBaby(req.params.id);
			res.json({ status: 'ok' })
		} catch (error) {
			res.status(500).json({ status: 'error', message: error.message });
		}
	}
}

export default babyController;