"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      this.belongsToMany(models.Cart, {
        through: models.CartProduct,
        as: "carts",
        foreignKey: "productId",
      });
      this.belongsToMany(models.Transaction, {
        through: models.TransactionProduct,
        as: "transactions",
        foreignKey: "productId",
      });
    }

    toJSON() {
      return { ...this.get() };
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE(11, 2).UNSIGNED,
        defaultValue: 0,
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "products",
      modelName: "Product",
    }
  );
  return Product;
};
