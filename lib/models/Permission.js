const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Permission extends Model {}

  Permission.init(
    {
      permission: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'uniquePermissionTableName',
        set(value) {
          if (!['create', 'read', 'write', 'update'].includes(value.toLowerCase())) {
            throw new Error('Permission must be one of [`create`, `read`, `write` or `update`] but got : ' + value)
          }
          this.setDataValue('permission', value.toLowerCase())
        },
      },

      tableName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'uniquePermissionTableName',
      },
    },
    {
      sequelize,
      tableName: 'sd_permission',
      modelName: 'sd_permission',

      paranoid: true,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    },
  )
  return Permission
}
