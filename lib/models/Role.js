const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Role extends Model {}
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'sd_role',
      modelName: 'sd_role',

      paranoid: true,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    },
  )
  return Role
}
