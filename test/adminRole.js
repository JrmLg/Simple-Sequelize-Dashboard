const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class adminRole extends Model {}

adminRole.init(
  {
    name: {
      type: DataTypes.ENUM('admin', 'superadmin'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'adminRole',
  }
);

module.exports = adminRole;
