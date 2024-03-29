const sequelize = require('./sequelize/sequelize-client')

const { Tag, Level, Quiz, Question, User, Answer } = require('./sequelize/associations')

async function initDb() {
  await sequelize.sync()
}

initDb()

module.exports = { Tag, Level, Quiz, Question, User, Answer }
