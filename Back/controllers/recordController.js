import Record from "../models/Record.js";

const recordController = {
	getBabyRecords: async (req, res) => {
		try {
			const records = await Record.getBabyRecords(req.params.id);
			res.json({ status: "ok", data: records })
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message })
		}
	},

	createRecord: async (req, res) => {
		try {
			const data = req.body;
			const record = await Record.createRecord(
				data.baby_id, 
				data.date, 
				Number(data.weight), 
				Number(data.height), 
				data.notes)
			res.json({ status: "ok", data: record })
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message })
		}
	},

	deleteRecord: async (req, res) => {
		try {
			await Record.deleteRecord(req.params.id);
			res.json({ status: "ok" })
		} catch (error) {
			res.status(500).json({ status: "error", message: error.message })
		}
	}
};

export default recordController;