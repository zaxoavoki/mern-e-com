const User = require("../../models/User");

class UserRepository {
  async create(user) {
    return await User.create(user);
  }

  async getOneByEmail(email) {
    return await User.findOne({ email });
  }

  async getOneById(id, select = "") {
    return await User.findById(id, select);
  }

  async deleteAll() {
    return await User.deleteMany({});
  }

  async updateById(id, user, options = {}) {
    return await User.findByIdAndUpdate(id, user, options);
  }

  async getAll(options = {}, select = "-password", limit = 10) {
    // TODO: Add sort option
    return await User.find(options, select).limit(limit);
  }

  async deleteOneById(id) {
    return await User.deleteOne({ _id: id });
  }

  async getRandom() {
    const count = await User.estimatedDocumentCount();
    return await User.findOne().skip(Math.floor(Math.random() * count));
  }
}

module.exports = new UserRepository();
