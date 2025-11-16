const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const Registration = sequelize.define('Registration', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },

  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  eventId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

  status: {
    type: DataTypes.ENUM('confirmed', 'waitlisted', 'cancelled'),
    defaultValue: 'confirmed'
  },

  qrCode: { type: DataTypes.TEXT, allowNull: true }, // base64 QR

  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Registration;
