import User from '../models/User.js';

const userController = {
	getAllUsers: async (req, res) => {
		try {
		const users = await User.getAll();
		res.json({ status: 'ok', data: users });
		} catch (error) {
		res.status(500).json({ status: 'error', message: error.message });
		}
	},

	getUserById: async (req, res) => {
		
	},

	createUser: async (req, res) => {
		
	}
}

export default userController;