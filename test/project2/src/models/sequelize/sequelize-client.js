const path = require('path')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../sqlite.db'),
  logging: false,

  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

module.exports = sequelize
