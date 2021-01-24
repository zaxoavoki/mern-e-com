const { sequelize, User } = require("../../models");

class UserRepository {
  async getOneByEmail(email) {
    const user = await User.findAll({ where: { email } });
    return user.length === 0 ? null : user[0].toJSON();
  }

  async create(user) {
    user.role = undefined;
    return await User.create(user);
  }

  async getOneById(id) {
    const user = await User.findAll({ where: { id } });
    return user.length === 0 ? null : user[0].toJSON();
  }

  async getSavedProductsByUserId(id) {
    // await User.
  }
}

module.exports = new UserRepository();
