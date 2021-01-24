const { DataTypes } = require("sequelize");
const { getSequelize } = require("../../helpers/database.mysql");
const Role = require("./Role");

const Address = getSequelize().define("Address", {
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
  role_id: {
    type: DataTypes.BIGINT,
    reference: {
      model: Role,
      key: "id",
    },
  },
});

module.exports = Address;
