const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize-client')

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
  },
  {
    sequelize,
    tableName: 'adminPermission',
    modelName: 'adminPermission',

    paranoid: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
)

module.exports = adminPermission
