const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');

class adminRole extends Model {}
adminRole.init(
  {
    name: {
      type: DataTypes.ENUM('admin', 'superadmin'),
      allowNull: false,
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
    tableName: 'adminRole',
    modelName: 'adminRole',
  }
);

module.exports = adminRole;
