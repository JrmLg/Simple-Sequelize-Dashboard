const express = require('express')
const path = require('path')

// [ Middlewares ]
const setAdminViewSettings = require('./middlewares/setAdminViewSettings')
const removeAdminViewSettings = require('./middlewares/removeAdminViewSettings')
const loadModelsInLocals = require('./middlewares/loadModelsInLocals')
const adminSession = require('./middlewares/adminSession')

// [ Routers ]
const authRouter = require('./routers/authRouter')
const dashboardRouter = require('./routers/dashboardRouter')
const superAdminRouter = require('./routers/superAdminRouter')

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

  const dashRouter = express.Router()

  dashRouter.use(baseUrl, adminSession(sequelize, options))

  dashRouter.use(baseUrl, (req, res, next) => {
    console.log('Admin Session : ', req.session)
    req.session.privateAdminData = 'A SUPER SECRET ADMIN DATA'
    next()
  })

  // Change view engine to EJS for admin dashboard render
  dashRouter.use(setAdminViewSettings)

  dashRouter.use(express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))
  dashRouter.use(express.static(path.join(__dirname, './public/')))

  // dashRouter.use(express.urlencoded({ extended: false }))

  dashRouter.use(loadModelsInLocals(sequelize))

  dashRouter.use(`${baseUrl}/auth`, authRouter(sequelize, options))
  dashRouter.use(`${baseUrl}/dashboard`, dashboardRouter(sequelize, options))
  dashRouter.use(`${baseUrl}/superAdmin`, superAdminRouter(sequelize, options))

  dashRouter.get(`${baseUrl}`, (req, res) => res.redirect(`${baseUrl}/dashboard`))

  // Reset app view engine to original settings
  dashRouter.use(removeAdminViewSettings)

  return dashRouter
}
