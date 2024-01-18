const express = require('express')

const authController = require('./controller/authController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.get('/login', authController.displayLoginPage)
  router.post('/login', authController.handleLogin)

  router.get('/logout', authController.handleLogout)

  return router
}
