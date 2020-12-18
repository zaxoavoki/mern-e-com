const { lorem } = require("faker");

const CategoryRepository = require("../src/repositories/odm/category.repository");

module.exports = async ({ count }) => {
  try {
    await CategoryRepository.deleteAll();
  } catch (err) {}

  for (let i = 0; i < count; i++) {
    await CategoryRepository.create({
      name: lorem.word(),
      description: lorem.sentence(),
    });
  }
};
