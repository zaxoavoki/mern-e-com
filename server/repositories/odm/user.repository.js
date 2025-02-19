const mongoose = require("mongoose");

const User = require("../../models/odm/User");
const Transaction = require("../../models/odm/Transaction");

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

  async getSavedProducts(userId) {
    return await User.findById(userId, "saved", { populate: "saved" });
  }

  async saveProduct(userId, productId) {
    return await User.findByIdAndUpdate(
      userId,
      { $push: { saved: mongoose.Types.ObjectId(productId) } },
      { new: true, select: "-_id saved" }
    );
  }

  async unsaveProduct(userId, productId) {
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { saved: mongoose.Types.ObjectId(productId) } },
      { new: true, select: "-_id saved" }
    );
  }

  // TODO: Such methods should return array of products
  // FIXME: Fix query
  async getBoughtProducts(userId) {
    return await Transaction.aggregate()
      .match({ user: mongoose.Types.ObjectId(userId) })
      .group({ _id: "$user", products: { $push: "$product" } })
      .lookup({
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "products",
      });
  }
}

module.exports = new UserRepository();
