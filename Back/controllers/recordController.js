import Record from "../models/Record.js";

const recordController = {
	getBabyRecords: async (req, res) => {
		try {
			const records = await Record.getBabyRecords(req.params.id);
			res.json({ status: "ok", data: records })
		} catch (error) {
			res.json({ status: "error", message: error })
		}
	}
};

export default recordController;