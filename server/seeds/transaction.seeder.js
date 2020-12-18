const { random } = require("faker");

const UserRepository = require("../src/repositories/odm/user.repository");
const ProductRepository = require("../src/repositories/odm/product.repository");
const TransactionRepository = require("../src/repositories/odm/transaction.repository");

module.exports = async ({ count }) => {
  try {
    await TransactionRepository.deleteAll();
  } catch (err) {}

  for (let i = 0; i < count; i++) {
    await TransactionRepository.create({
      user: (await UserRepository.getRandom())._id,
      product: (await ProductRepository.getRandom())._id,
      count: random.number({ min: 1, max: 5 }),
      status: ["Cancelled", "Approved", "Waiting for paying"][random.number(2)],
    });
  }
};
