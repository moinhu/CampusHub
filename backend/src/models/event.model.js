const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  venueId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  clubId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  registrationDeadline: { type: DataTypes.DATE, allowNull: true },
  maxRegistrations: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  posterUrl: { type: DataTypes.STRING, allowNull: true }, // later can be stored in Mongo
  mode: { type: DataTypes.ENUM('Technical','Cultural','Sports','Fest','Workshop'), defaultValue: 'Technical' },
  status: { type: DataTypes.ENUM('pending','approved','rejected','cancelled'), defaultValue: 'pending' },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Event;
