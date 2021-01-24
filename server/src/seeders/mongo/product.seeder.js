const { commerce, image, random, lorem } = require("faker");

const ProductRepository = require("../../repositories/odm/product.repository");
const CategoryRepository = require("../../repositories/odm/category.repository");

module.exports = async ({ count }) => {
  try {
    await ProductRepository.deleteAll();
  } catch (err) {}

  for (let i = 0; i < count; i++) {
    await ProductRepository.create({
      title: commerce.productName(),
      description: lorem.paragraphs(5),
      images: [image.lorempicsum.image(500, 500, true)],
      price: random.float({ min: 10, max: 3000 }),
      category: (await CategoryRepository.getRandom())._id,
    });
  }
};
