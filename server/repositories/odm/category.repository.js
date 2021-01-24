const Category = require("../../models/odm/Category");

class CategoryRepository {
  async create(category) {
    return await Category.create(category);
  }

  async getAll() {
    return await Category.find();
  }

  async getOneById(id) {
    return await Category.findById(id);
  }

  async updateOneById(id, category) {
    return await Category.findByIdAndUpdate(id, category, { new: true });
  }

  async deleteOneById(id) {
    return await Category.findByIdAndDelete(id);
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
