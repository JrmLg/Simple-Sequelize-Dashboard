const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class adminPermission extends Model {}

adminPermission.init(
  {
    permissionToRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    permissionToWrite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    permissionToUpdate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    permissionToDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'adminPermission',
  }
);

module.exports = adminPermission;
