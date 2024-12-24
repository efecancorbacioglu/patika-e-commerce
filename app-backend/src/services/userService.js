const bcrypt = require("bcryptjs");
const mongooseUser = require("../models/userModel");

async function getUser(userId) {
    try {
        const user = await mongooseUser.findById(userId);
        if (!user) {
            return null;
        }
        const { password, ...userDetails } = user.toObject();
        return userDetails;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function updateUser(userParams) {
    const userId = userParams.id;
    try {
        const user = await mongooseUser.findById(userId);
        if (!user) {
            return { status: 404, message: "User not found" };
        }

        const { id, ...updateFields } = userParams;

        if (updateFields.password) {
            updateFields.password = bcrypt.hashSync(updateFields.password, 10);
        }

        Object.assign(user, updateFields);
        await user.save();
        return { status: 200, message: "User updated successfully", };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal server error" };
    }
}

async function deleteUser(userId) {
    try {
        const user = await mongooseUser.findByIdAndDelete(userId);
        if (!user) {
            return null;
        }
        return `${user.username} deleted`;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
};
