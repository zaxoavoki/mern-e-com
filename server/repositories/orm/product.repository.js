const { Product } = require("../../models");

class ProductRepository {
  async getAll(field) {
    const cond = {};

    if (field === "price") {
      cond.order = ["price", "ASC"];
    } else if (field === "-price") {
      cond.order = ["price", "DESC"];
    } else {
      cond.order = ["createdAt", "ASC"];
    }

    const products = await Product.findAll({
      order: [cond.order],
    });

    return products.map((e) => e.toJSON());
  }

  async getOneById(id) {
    return (
      await Product.findOne({
        where: { id },
      })
    ).toJSON();
  }
}

module.exports = new ProductRepository();
