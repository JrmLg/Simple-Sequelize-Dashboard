const { Sequelize } = require('sequelize')

// Créer une instance de connexion à notre BDD Postgres (équivalent du new pg.Client() en avec pg)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './test/sqlite.db',
  logging: false,
})

module.exports = sequelize
