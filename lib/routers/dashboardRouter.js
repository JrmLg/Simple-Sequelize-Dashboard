const express = require('express')

const dashboardController = require('./controller/dashboardController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.get('/', dashboardController.displayHomePage)

  sequelize.models.forEach((model) => {
    // On enregistre le model dans les locals
    router.locals.model = model

    router.post(`/${model.tableName}/create`, (req, res) => {})
  })

  return router
}
