const userService = require('../services/userService');

const userController = {
    getUserById: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await userService.getUser(userId);
            if (!user) {
                return res.status(404).send({ response: { message: "User not found" } });
            }
            res.status(200).send({ response: user });
        } catch (error) {
            console.error(error, 'error');
            res.status(500).send({ response: { message: "Failed to fetch user data" } });
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const updateData = { ...req.body, id: userId }; 
            const response = await userService.updateUser(updateData);
            if (response.status === 404) {
                return res.status(404).send({ response: { message: response.message } });
            }
            if (response.status === 400) {
                return res.status(400).send({ response: { message: response.message } });
            }
            res.status(200).send({ response: { message: "User successfully updated" } });
        } catch (e) {
            console.error(e, 'error');
            res.status(500).send({ response: { message: "Internal server error" } });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const response = await userService.deleteUser(req.params.id);
            if (!response) {
                return res.status(404).send({ response: { message: "User not found" } });
            }
            res.status(200).send({ response: { message: response } });
        } catch (e) {
            console.error(e, 'error');
            res.status(500).send({ response: { message: "Internal server error" } });
        }
    }
}
module.exports = userController