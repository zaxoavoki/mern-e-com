const validator = require("validator");

const CommentRepository = require("../repositories/odm/comment.repository");

class CommentService {
  async getOneById(id) {
    const comment = await CommentRepository.getOneById(id);
    if (!comment) {
      throw new Error("Comment was not found");
    }
    return comment;
  }

  async create({ text, user, product, images = [] }) {
    if (!validator.isLength(text, { min: 6, max: 5000 })) {
      throw new Error("Invalid data");
    }

    if (!validator.isMongoId(product) || !validator.isMongoId(user)) {
      throw new Error("Invalid product id");
    }

    return await CommentRepository.create({ text, product, images, user });
  }

  async updateById(id, { text, images = [] }) {
    const comment = await CommentRepository.getOneById(id);
    if (!comment) {
      throw new Error("Comment was not found");
    }

    if (!validator.isLength(text, { min: 6, max: 5000 })) {
      throw new Error("Invalid data");
    }

    return await CommentRepository.updateById(
      id,
      {
        text,
        images: images.length === 0 ? comment.images : images,
      },
      { new: true }
    );
  }

  async deleteById(id) {
    if (!(await CommentRepository.getOneById(id))) {
      throw new Error("Comment was not found");
    }
    return await CommentRepository.deleteById(id);
  }
}

module.exports = new CommentService();
