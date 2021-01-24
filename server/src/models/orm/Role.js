const { DataTypes } = require("sequelize");
const { getSequelize } = require("../../helpers/database.mysql");

const Role = getSequelize().define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;
