const bcrypt = require("bcryptjs");
const mongooseUser = require("../models/userModel");

async function updateUser(userParams) {
  const userId = userParams.id;
  try {
    const user = await mongooseUser.findById(userId);
    if (!user) {
      return false;
    }

    const { id, ...updateFields } = userParams;

    if (updateFields.password) {
      updateFields.password = bcrypt.hashSync(updateFields.password, 10);
    }

    Object.assign(user, updateFields);

    await user.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteUser(userId) {
  try {
    const user = await mongooseUser.findByIdAndDelete(userId);
    return `${user.username} deleted`;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = {
  updateUser,
  deleteUser,
};
