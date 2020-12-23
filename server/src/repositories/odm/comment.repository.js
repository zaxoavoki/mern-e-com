const mongoose = require("mongoose");

const Comment = require("../../models/Comment");

class CommentRepository {
  async create(comment) {
    comment.user = mongoose.Types.ObjectId(comment.user);
    comment.product = mongoose.Types.ObjectId(comment.product);
    return await Comment.create(comment);
  }

  async getOneById(id) {
    return await Comment.findById(id);
  }

  async updateById(id, comment, options = {}) {
    // TODO: Adjust options param to database
    return await Comment.findByIdAndUpdate(id, comment, options);
  }

  async getAllInProduct(id) {
    return await Comment.find({ product: id }, "-product");
  }

  async deleteById(id) {
    return await Comment.findByIdAndDelete(id);
  }

  async deleteAll() {
    return await Comment.deleteMany();
  }
}

module.exports = new CommentRepository();
