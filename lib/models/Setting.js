const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Setting extends Model {}
  Setting.init(
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      value: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'sd_setting',
      modelName: 'sd_setting',

      timestamps: true,
      createdAt: true,
      updatedAt: true,
    },
  )
  return Setting
}
