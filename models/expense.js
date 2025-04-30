const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../utils/db-connection");

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

module.exports = Expense;
