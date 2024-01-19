const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelizeInstance');

class testUser extends Model {}
testUser.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'testUser',
    modelName: 'testUser',
  }
);

module.exports = testUser;
