const Transaction = require("../../models/Transaction");

class TransactionRepository {
  async create(transaction) {
    return await Transaction.create(transaction);
  }

  async deleteAll() {
    return await Transaction.deleteMany();
  }

  async getAll() {
    return await Transaction.find();
  }

  async groupByProduct() {
    return await Transaction.aggregate([
      { $group: { _id: "$product", users: { $addToSet: "$user" } } },
    ]);
  }
}

module.exports = new TransactionRepository();
