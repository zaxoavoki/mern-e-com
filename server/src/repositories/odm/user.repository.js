const User = require("../../models/User");

class UserRepository {
  constructor() {}

  async create(user) {
    return await User.create(user);
  }

  async getOneByEmail(email) {
    return await User.findOne({ email });
  }

  async deleteAll() {
    return await User.deleteMany({});
  }

  async updateById(_id, user) {
    return await User.updateOne({ _id }, user);
  }

  async getAll() {
    return await User.find({}, "-password");
  }

  async count() {
    return User.estimatedDocumentCount();
  }

  async getRandom() {
    const count = await User.estimatedDocumentCount();
    return await User.findOne().skip(Math.floor(Math.random() * count));
  }
}

module.exports = new UserRepository();
