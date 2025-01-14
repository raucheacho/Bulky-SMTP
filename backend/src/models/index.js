const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Template = sequelize.define("Template", {
  name: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
});

const RecipientList = sequelize.define("RecipientList", {
  name: { type: DataTypes.STRING, allowNull: false },
  recipients: { type: DataTypes.TEXT, allowNull: false }, // JSON array
});

module.exports = { sequelize, Template, RecipientList };
