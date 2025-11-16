const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const ClubMember = sequelize.define('ClubMember', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  clubId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  role: { 
    type: DataTypes.ENUM('president', 'secretary', 'member'), 
    defaultValue: 'member' 
  },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = ClubMember;
