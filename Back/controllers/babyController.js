import Baby from '../models/Babies.js';

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
		try {
			const baby = await Baby.createBaby(req.body.name, req.body.birthdate, req.body.gender);
			res.json({ status: 'ok', data: baby})
		} catch (error) {
			res.status(500).json({ status: 'error', message: error.message });
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
