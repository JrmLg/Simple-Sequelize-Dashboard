const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize-client')

class Question extends Model {}

Question.init(
  {
    description: { type: DataTypes.TEXT, allowNull: false },
    wiki: { type: DataTypes.TEXT },
    anecdote: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    tableName: 'question',
  },
)

module.exports = Question
