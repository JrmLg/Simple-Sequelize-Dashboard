const express = require('express')
const path = require('path')

// [ Middlewares ]
const setAdminViewSettings = require('./middleware/setAdminViewSettings')
const removeAdminViewSettings = require('./middleware/removeAdminViewSettings')

// [ Routers ]
const authRouter = require('./routers/authRouter')
const dashboardRouter = require('./routers/dashboardRouter')
const superAdminRouter = require('./routers/superAdminRouter')

module.exports = (sequelize, options) => {
  options = {
    baseUrl: '/admin',
    ...options,
  }
  const { baseUrl } = options

  const dashRouter = express.Router()

  // Change view engine to EJS for admin dashboard render
  dashRouter.use(setAdminViewSettings)

  dashRouter.use(express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))
  dashRouter.use(express.static(path.join(__dirname, './public/')))

  // dashRouter.use(express.urlencoded({ extended: false }))

  dashRouter.use(`${baseUrl}/auth`, authRouter(sequelize, options))
  dashRouter.use(`${baseUrl}/dashboard`, dashboardRouter(sequelize, options))
  dashRouter.use(`${baseUrl}/superAdmin`, superAdminRouter(sequelize, options))

  dashRouter.get(`${baseUrl}`, (req, res) => res.redirect(`${baseUrl}/dashboard`))

  // Reset app view engine to original settings
  dashRouter.use(removeAdminViewSettings)

  return dashRouter
}
