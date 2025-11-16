const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const Venue = sequelize.define('Venue', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }, // e.g., "Auditorium A"
  capacity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
  location: { type: DataTypes.STRING, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Venue;
