const express = require('express')

// [ Controllers ]
const authController = require('../controller/authController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.post('/login', authController.login)
  router.post('/logout', authController.logout)

  return router
}
