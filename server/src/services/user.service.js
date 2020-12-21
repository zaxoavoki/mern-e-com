const validator = require("validator");

const UserRepository = require("../repositories/odm/user.repository");

class UserService {
  async getOneById(id) {
    if (!validator.isMongoId(id)) {
      throw new Error("Invalid id");
    }
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
    if (!validator.isMongoId(id)) {
      throw new Error("Invalid id");
    }
    if (!(await UserRepository.getOneById(id))) {
      throw new Error("User was not found");
    }
    return await UserRepository.deleteOneById(id);
  }

  // TODO: Put validation in another layer
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
}

module.exports = new UserService();
