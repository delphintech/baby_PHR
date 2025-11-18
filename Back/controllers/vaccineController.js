import Vaccine from "../models/Vaccine.js";

const vaccineController = {
	getAllVaccines: async (req, res) => {
		try {
			const vaccines = await Vaccine.getAllVaccines();
			res.json({ status: "ok", data: vaccines })
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message })
		}
	},

	getBabyVaccine: async (req, res) => {
		try {
			const vaccines = await Vaccine.getBabyVaccines(req.params.id);
			res.json({ status: "ok", data: vaccines })
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message })
		}
	},

	updateVaccine: async (req, res) => {
		try {
			const data = req.body;
			const vaccine = await Vaccine.updateVaccine(data.id, data.completed, data.completed_at);
			res.json({ status: "ok", data: vaccine })
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message })
		}
	} 
};

export default vaccineController;