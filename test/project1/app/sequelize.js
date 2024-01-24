const path = require('path')
const { Sequelize } = require('sequelize')

// Créer une instance de connexion à notre BDD Postgres (équivalent du new pg.Client() en avec pg)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, './models/sqlite.db'),
  logging: false,
})

module.exports = sequelize
