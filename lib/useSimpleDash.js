const express = require('express')
const path = require('path')

// [ Middlewares ]
const addAdminRenderMethod = require('./middlewares/addAdminRenderMethod')
const adminSession = require('./middlewares/adminSession')
const addModelsToLocals = require('./middlewares/addModelsToLocals')

// [ Routers ]
const authRouter = require('./routers/authRouter')
const dashboardRouter = require('./routers/dashboardRouter')
const superAdminRouter = require('./routers/superAdminRouter')

// [ Utils ]
const initDashModels = require('./models/initDashModels')
const updateDbSchema = require('./utils/updateDbSchema')

const MINUTES = 60 * 1000

module.exports = (sequelize, options) => {
  options = {
    baseUrl: '/admin',
    sessionName: 'Dashboard_admin_session',
    sessionSecret: 'Dashboard admin session secret',
    sessionCookieMaxAge: 20 * MINUTES,
    sessionCookieSecure: false,
    ...options,
  }

  const { baseUrl } = options

  // we need to bind our models on app sequelize instance
  const dashModels = initDashModels(sequelize)
  // We ensure that the admin database is up to date with our models.
  updateDbSchema(sequelize, dashModels)

  const dashRouter = express.Router()

  dashRouter.use(baseUrl, express.static(path.join(__dirname, './public/')))
  dashRouter.use(baseUrl, express.static(path.join(__dirname, '../node_modules/bootstrap/dist/')))
  dashRouter.use(baseUrl, express.static(path.join(__dirname, '../node_modules/bootstrap-icons/')))

  dashRouter.use(baseUrl, addAdminRenderMethod(sequelize, options))
  dashRouter.use(baseUrl, adminSession(sequelize, options))
  dashRouter.use(baseUrl, addModelsToLocals(sequelize, options))

  dashRouter.use(`${baseUrl}/auth`, authRouter(sequelize, options))
  dashRouter.use(`${baseUrl}/dashboard`, dashboardRouter(sequelize, options))
  dashRouter.use(`${baseUrl}/superAdmin`, superAdminRouter(sequelize, options))

  dashRouter.get(`${baseUrl}`, (req, res) => res.redirect(`${baseUrl}/dashboard`))

  return dashRouter
}
