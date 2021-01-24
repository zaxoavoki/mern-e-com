const validator = require("validator");

const ProductRepository = require("../repositories/orm/product.repository");

class ProductService {
  async getOneById(id) {
    const product = await ProductRepository.getOneById(id);
    if (!product) {
      throw new Error("Product was not found");
    }
    return product;
  }

  async getAll({ sort }) {
    // TODO: Validate this piece of code
    if (sort === "most_popular" || sort === "less_popular") {
      return await ProductRepository.getAllSortedByPopularity(sort);
    }

    if (sort === "most_rated") {
      return await ProductRepository.getAllSortedByRate();
    }

    let field = "price";
    if (sort === "highest_price") field = "-price";
    if (sort === "lowest_price") field = "price";
    if (sort === "newest") field = "created_at";

    return await ProductRepository.getAll(field);
  }

  async updateById(id, { title, price, description, images = [] }) {
    const product = await ProductRepository.getOneById(id);
    if (!product) {
      throw new Error("Product was not found");
    }

    // TODO: Add custom error message
    // TODO: Change range with process.env vars
    if (
      !validator.isLength(title, { min: 5, max: 32 }) ||
      !validator.isFloat(price, { min: 1, max: 500000 }) ||
      !validator.isLength(description, { min: 24, max: 6000 })
    ) {
      throw new Error("Invalid data");
    }

    return await ProductRepository.updateById(id, {
      title,
      description,
      price,
      images: images.length === 0 ? product.images : images,
    });
  }

  async deleteOneById(id) {
    if (!(await ProductRepository.getOneById(id))) {
      throw new Error("Product was not found");
    }
    return ProductRepository.deleteOneById(id);
  }
}

module.exports = new ProductService();
