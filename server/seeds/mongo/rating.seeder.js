const { random } = require("faker");

const RatingRepository = require("../../src/repositories/odm/rating.repository");
const TransactionRepository = require("../../src/repositories/odm/transaction.repository");

module.exports = async ({ count }) => {
  try {
    await RatingRepository.deleteAll();
  } catch (err) {}

  const products = await TransactionRepository.groupByProduct();

  for (const product of products) {
    for (let i = 0; i < random.number(product.users.length); i++) {
      if (count-- === 0) {
        return;
      }
      await RatingRepository.create({
        user: product.users[i],
        product: product._id,
        stars: random.number(5),
      });
    }
  }
};
