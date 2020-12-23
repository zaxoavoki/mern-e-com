const { lorem, random, image } = require("faker");

const UserRepository = require("../src/repositories/odm/user.repository");
const ProductRepository = require("../src/repositories/odm/product.repository");
const CommentRepository = require("../src/repositories/odm/comment.repository");

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
