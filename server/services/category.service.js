const validator = require("validator");

const CategoryRepository = require("../repositories/odm/category.repository");

class CategoryService {
  async getAll() {
    return await CategoryRepository.getAll();
  }

  async getOneById(id) {
    return await CategoryRepository.getOneById(id);
  }

  async create({ name, description }) {
    // TODO: Add env variables for constant validation values
    if (!validator.isLength(name, { min: 4, max: 24 })) {
      throw new Error("Ivalid data");
    }
    return await CategoryRepository.create({ name, description });
  }

  async updateOneById(id, { name, description }) {
    if (!(await CategoryRepository.getOneById(id))) {
      throw new Error("Category does not exist");
    }

    // TODO: Check if description can provide injection attack
    if (!validator.isLength(name, { min: 4, max: 24 })) {
      throw new Error("Invalid data");
    }

    return await CategoryRepository.updateOneById(id, { name, description });
  }

  async deleteOneById(id) {
    if (!(await CategoryRepository.getOneById(id))) {
      throw new Error("Category does not exist");
    }
    return await CategoryRepository.deleteOneById(id);
  }
}

module.exports = new CategoryService();
