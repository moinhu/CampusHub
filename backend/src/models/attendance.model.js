const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const Attendance = sequelize.define('Attendance', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },

  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  eventId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

  scannedBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, // club user id
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Attendance;
