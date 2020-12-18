const Category = require("../../models/Category");

class CategoryRepository {
  async create(category) {
    return await Category.create(category);
  }

  async getAll() {
    return await Category.find();
  }

  async getRandom() {
    const count = await Category.estimatedDocumentCount();
    return await Category.findOne().skip(Math.floor(Math.random() * count));
  }

  async deleteAll() {
    return await Category.deleteMany();
  }
}

module.exports = new CategoryRepository();
