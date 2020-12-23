const Product = require("../../models/Product");

class ProductRepository {
  async create(product) {
    return await Product.create(product);
  }

  async getOneById(id) {
    return await Product.findById(id).populate("category");
  }

  async deleteOneById(id) {
    return await Product.findByIdAndDelete(id);
  }

  async updateById(id, product) {
    return await Product.findByIdAndUpdate(id, product);
  }

  async deleteAll() {
    return await Product.deleteAll();
  }

  async getRandom() {
    const count = await Product.estimatedDocumentCount();
    return await Product.findOne().skip(Math.floor(Math.random() * count));
  }

  async getAll(sortBy) {
    return await Product.find().sort(sortBy);
  }

  async getAllSortedByPopularity(criteria) {
    return await Product.aggregate([
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "product",
          as: "transactions",
        },
      },
      {
        $addFields: {
          transactions: {
            $reduce: {
              input: "$transactions",
              initialValue: 0,
              in: {
                $add: [
                  { $cond: [{ $eq: ["$$this.status", "Approved"] }, "$$this.count", 0] },
                  "$$value",
                ],
              },
            },
          },
        },
      },
      { $sort: { transactions: criteria === "less_popular" ? 1 : -1 } },
    ]);
  }

  async getAllSortedByRate() {
    return await Product.aggregate([
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "product",
          as: "stars",
        },
      },
      {
        $addFields: {
          stars: {
            $reduce: {
              input: "$stars",
              initialValue: 0,
              in: { $avg: "$$this.stars" },
            },
          },
        },
      },
      { $sort: { stars: -1 } },
    ]);
  }
}

module.exports = new ProductRepository();
