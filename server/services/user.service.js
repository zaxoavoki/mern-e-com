const validator = require("validator");

const UserRepository = require("../repositories/odm/user.repository");
const ProductRepository = require("../repositories/odm/product.repository");

class UserService {
  async getOneById(id) {
    return await UserRepository.getOneById(id, "-password -saved");
  }

  async getAll({ limit, sort }) {
    // TODO: Add validation for sort
    if (limit && !validator.isInt(limit, { min: 0, max: 500 })) {
      throw new Error("Invalid limit");
    }
    return await UserRepository.getAll({}, "-password -saved", parseInt(limit));
  }

  async deleteOneById(id) {
    if (!(await UserRepository.getOneById(id))) {
      throw new Error("User was not found");
    }
    return await UserRepository.deleteOneById(id);
  }

  // TODO: Put validation to helper folder
  async updateOneById(id, { email, username }) {
    if (!validator.isEmail(email || "") || validator.isEmpty(username || "")) {
      throw new Error("Invalid data");
    }

    const user = await UserRepository.getOneByEmail(email);
    if (!user) {
      throw new Error("User does not exist");
    }

    if (String(user._id) !== id) {
      throw new Error("Email already in use");
    }

    return await UserRepository.updateById(
      id,
      { email, username },
      { new: true, projection: "-password" }
    );
  }

  async getSavedProducts(userId) {
    if (!(await UserRepository.getOneById(userId))) {
      throw new Error("User was not found");
    }
    return await UserRepository.getSavedProducts(userId);
  }

  async saveProduct(userId, productId) {
    const user = await UserRepository.getOneById(userId);
    if (!user) {
      throw new Error("User was not found");
    }

    // TODO: What should I return here?
    if (!(await ProductRepository.getOneById(productId))) {
      throw new Error("Product was not found");
    }

    if (user.saved.findIndex((e) => String(e) === productId) !== -1) {
      return (await UserRepository.unsaveProduct(userId, productId)).saved;
    }

    return (await UserRepository.saveProduct(userId, productId)).saved;
  }

  async isSavedProduct(userId, productId) {
    const user = await UserRepository.getOneById(userId);
    if (!user) {
      throw new Error("User was not found");
    }

    const product = await ProductRepository.getOneById(productId);
    if (!product) {
      throw new Error("Product was not found");
    }

    if (user.saved.findIndex((e) => String(e) === productId) === -1) {
      return { isSaved: false, product };
    }

    return { isSaved: true, product };
  }

  async getBoughtProducts(userId) {
    // TODO: Is there any reason to leave this?
    if (!(await UserRepository.getOneById(userId))) {
      throw new Error("User was not found");
    }
    return await UserRepository.getBoughtProducts(userId);
  }
}

module.exports = new UserService();
