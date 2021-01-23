const UserRepository = require("../../src/repositories/odm/user.repository");
const ProductRepository = require("../../src/repositories/odm/product.repository");

module.exports = async ({ count }) => {
  for (const user of await UserRepository.getAll()) {
    user.saved = [];
    await UserRepository.updateById(user._id, user);

    for (let j = 0; j < Math.floor(Math.random() * count); j++) {
      user.saved.push((await ProductRepository.getRandom())._id);
    }

    await UserRepository.updateById(user._id, user);
  }
};
