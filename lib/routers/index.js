const express = require('express')

const authRouter = require('./authRouter')
const dashboardRouter = require('./dashboardRouter')
const superAdminRouter = require('./superAdminRouter')

module.exports = (sequelize, options) => {
  const { baseUrl } = options
  const app = express.Router()

  app.use(express.urlencoded({ extended: false }))

  app.use(`/${baseUrl}/auth/`, authRouter(sequelize, options))
  app.use(`/${baseUrl}/dashboard/`, dashboardRouter(sequelize, options))
  app.use(`/${baseUrl}/superAdmin/`, superAdminRouter(sequelize, options))

  return app
}
