const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize-client')

class Quiz extends Model {}

Quiz.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: 'quiz',
  },
)

module.exports = Quiz
