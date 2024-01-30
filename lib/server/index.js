const express = require('express')
const path = require('path')

// [ Middlewares ]
const adminSession = require('./middlewares/adminSession')
const morgan = require('morgan')

// [ Routers ]
const authRouter = require('./routers/authRouter')
const dashboardRouter = require('./routers/dashboardRouter')
const superAdminRouter = require('./routers/superAdminRouter')

// [ Utils ]
const initDashModels = require('./models/initDashModels')
const updateDbSchema = require('./utils/updateDbSchema')
const parseModelsInfoInLocals = require('./middlewares/parseModelsInfoInLocals')
const updateAdminInfo = require('./middlewares/updateAdminInfo')

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

  dashRouter.use(baseUrl, morgan('dev'))

  dashRouter.use(baseUrl, express.json())
  dashRouter.use(baseUrl, express.urlencoded({ extended: true }))

  dashRouter.use(baseUrl, express.static(path.join(__dirname, '../client/build/')))

  dashRouter.use(baseUrl, adminSession(sequelize, options))
  dashRouter.use(baseUrl, parseModelsInfoInLocals(sequelize, options))
  dashRouter.use(baseUrl, updateAdminInfo(sequelize, options))

  // All this routes are accessible by everyone for connection
  dashRouter.use(`${baseUrl}/auth`, authRouter(sequelize, options))

  // All this routes are only accessible by superAdmin
  // We need to protect this routes with a middleware
  dashRouter.use(`${baseUrl}/superAdmin/`, superAdminRouter(sequelize, options))

  // All this routes are accessible by admin and superAdmin
  dashRouter.use(`${baseUrl}/`, dashboardRouter(sequelize, options))

  return dashRouter
}
