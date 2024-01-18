const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');

class adminPermission extends Model {}
adminPermission.init(
  {
    permission: {
      type: DataTypes.ENUM('create', 'read', 'update', 'delete'),
      allowNull: false,
      unique: 'uniquePermissionTableName',
    },
    tableName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: 'uniquePermissionTableName',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'adminPermission',
    modelName: 'adminPermission',
  }
);

module.exports = adminPermission;
