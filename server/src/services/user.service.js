const validator = require("validator");

const UserRepository = require("../repositories/odm/user.repository");

class UserService {
  async getOneById(id) {
    return await UserRepository.getOneById(id, "-password -saved");
  }

  async getAll({ limit, sort }) {
    // TODO: Add validation for sort
    if (limit && !validator.isInt(limit, { min: 0, max: 500 })) {
      throw new Error("Invalid limit");
    }
    return await UserRepository.getAll({}, "-password -saved", parseInt(limit));
  }

  async deleteOneById(id) {
    if (!(await UserRepository.getOneById(id))) {
      throw new Error("User was not found");
    }
    return await UserRepository.deleteOneById(id);
  }

  // TODO: Put validation to helper folder
  async updateOneById(id, { email, username }) {
    if (!validator.isEmail(email || "") || validator.isEmpty(username || "")) {
      throw new Error("Invalid data");
    }

    const user = await UserRepository.getOneByEmail(email);
    if (!user) {
      throw new Error("User does not exist");
    }

    if (String(user._id) !== id) {
      throw new Error("Email already in use");
    }

    return await UserRepository.updateById(
      id,
      { email, username },
      { new: true, projection: "-password" }
    );
  }

  async getSavedProducts(userId) {
    if (!(await UserRepository.getOneById(userId))) {
      throw new Error("User was not found");
    }
    return await UserRepository.getSavedProducts(userId);
  }

  async getBoughtProducts(userId) {
    // TODO: Is there any reason to leave this?
    if (!(await UserRepository.getOneById(userId))) {
      throw new Error("User was not found");
    }
    return await UserRepository.getBoughtProducts(userId);
  }
}

module.exports = new UserService();
