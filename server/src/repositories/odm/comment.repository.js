const Comment = require("../../models/Comment");

class CommentRepository {
  async create(comment) {
    return await Comment.create(comment);
  }

  async deleteAll() {
    return await Comment.deleteMany();
  }
}

module.exports = new CommentRepository();
