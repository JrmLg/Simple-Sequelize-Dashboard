const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class adminPermission extends Model {}

adminPermission.init(
  {
    permission: {
      type: DataTypes.ENUM('create', 'read', 'update', 'delete'),
      allowNull: false,
    },
    tableName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'adminPermission',
  }
);

module.exports = adminPermission;
