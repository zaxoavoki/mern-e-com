const Product = require("../../models/Product");

class ProductRepository {
  async create(product) {
    return await Product.create(product);
  }

  async getOneById(_id) {
    return await Product.findOne({ _id });
  }

  async deleteAll() {
    return await Product.deleteAll();
  }

  async getRandom() {
    const count = await Product.estimatedDocumentCount();
    return await Product.findOne().skip(Math.floor(Math.random() * count));
  }
}

module.exports = new ProductRepository();
