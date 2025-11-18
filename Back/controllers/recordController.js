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
		console.log(req.body);
		try {
			const record = await Record.createRecord(
				req.body.baby_id, 
				req.body.date, 
				Number(req.body.weight), 
				Number(req.body.height), 
				req.body.notes)
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