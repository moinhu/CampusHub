const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const EventApproval = sequelize.define('EventApproval', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  eventId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  approvedBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true }, // faculty/admin user id
  status: { type: DataTypes.ENUM('approved','rejected','pending'), defaultValue: 'pending' },
  comment: { type: DataTypes.TEXT, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = EventApproval;
