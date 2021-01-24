const { DataTypes } = require("sequelize");
const { getSequelize } = require("../../helpers/database.mysql");

const Address = require("./Address");
const Role = require("./Role");

const User = getSequelize().define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_id: {
    type: DataTypes.BIGINT,
    reference: {
      model: Address,
      key: "id",
    },
  },
  role_id: {
    type: DataTypes.BIGINT,
    reference: {
      model: Role,
      key: "id",
    },
  },
});

module.exports = User;
