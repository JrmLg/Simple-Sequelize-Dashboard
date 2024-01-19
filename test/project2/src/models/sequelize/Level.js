const { DataTypes, Model } = require('sequelize')
const sequelize = require('./sequelize-client')

class Level extends Model {}

Level.init(
  {
    name: {
      type: DataTypes.TEXT,
      unique: true,

      set(value) {
        this.setDataValue('name', value[0].toUpperCase() + value.slice(1).toLowerCase())
      },
    },

    power: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: 'level',
  },
)

module.exports = Level
