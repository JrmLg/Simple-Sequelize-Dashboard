const express = require('express')
const path = require('path')

// [ Middlewares ]
const addAdminRenderMethod = require('./middlewares/addAdminRenderMethod')
const adminSession = require('./middlewares/adminSession')
const addModelsToLocals = require('./middlewares/addModelsToLocals')
const prepareSidebarLocals = require('./middlewares/prepareSidebarLocals')

// [ Routers ]
const dashboardRouter = require('./routers/dashboardRouter')
const superAdminRouter = require('./routers/superAdminRouter')

// [ Utils ]
const initDashModels = require('./models/initDashModels')
const updateDbSchema = require('./utils/updateDbSchema')
const parseModelsInfoInLocals = require('./middlewares/parseModelsInfoInLocals')

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
  const sdModels = initDashModels(sequelize)
  // We ensure that the admin database is up to date with our models.
  updateDbSchema(sequelize, sdModels)

  const dashRouter = express.Router()

  dashRouter.use(baseUrl, express.json())
  dashRouter.use(baseUrl, express.urlencoded({ extended: true }))

  dashRouter.use(baseUrl, express.static(path.join(__dirname, './public/')))
  dashRouter.use(baseUrl, express.static(path.join(__dirname, '../node_modules/bootstrap/dist/')))
  dashRouter.use(baseUrl, express.static(path.join(__dirname, '../node_modules/bootstrap-icons/')))

  dashRouter.use(baseUrl, addAdminRenderMethod(sequelize, options))
  dashRouter.use(baseUrl, adminSession(sequelize, options))
  dashRouter.use(baseUrl, addModelsToLocals(sequelize, options))
  dashRouter.use(baseUrl, parseModelsInfoInLocals(sequelize, options))
  dashRouter.use(baseUrl, prepareSidebarLocals(sequelize, options))

  // All this routes are accessible by admin and superAdmin
  dashRouter.use(`${baseUrl}/dashboard`, dashboardRouter(sequelize, options))

  // All this routes are only accessible by superAdmin
  // We need to protect this routes with a middleware
  dashRouter.use(`${baseUrl}/setting`, superAdminRouter(sequelize, options))

  dashRouter.get(`${baseUrl}`, (req, res) => res.redirect(`${baseUrl}/dashboard`))

  return dashRouter
}
