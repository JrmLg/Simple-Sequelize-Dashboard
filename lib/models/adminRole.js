const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize-client')

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
    modelName: 'adminRole',

    paranoid: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
)

module.exports = adminRole
