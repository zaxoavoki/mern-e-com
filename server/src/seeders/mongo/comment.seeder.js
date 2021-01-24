const { lorem, random, image } = require("faker");

const UserRepository = require("../../repositories/odm/user.repository");
const ProductRepository = require("../../repositories/odm/product.repository");
const CommentRepository = require("../../repositories/odm/comment.repository");

module.exports = async ({ count }) => {
  try {
    await CommentRepository.deleteAll();
  } catch (err) {}

  for (let i = 0; i < count; i++) {
    await CommentRepository.create({
      user: (await UserRepository.getRandom())._id,
      product: (await ProductRepository.getRandom())._id,
      text: lorem.text(2),
      images: Array.from({ length: random.number(5) }, () => image.imageUrl()),
    });
  }
};
