const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');

class User extends Model {}
User.init(
  {
    firstname: DataTypes.TEXT,

    lastname: DataTypes.TEXT,

    email: {
      type: DataTypes.STRING(100), // -> VARCHAR(100)
      allowNull: false,
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: 'user',
    paranoid: true,
  }
);

module.exports = User;
