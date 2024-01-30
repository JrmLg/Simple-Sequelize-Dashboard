const express = require('express')

// [ Controllers ]
const dashboardController = require('../controller/dashboardController')
const modelController = require('../controller/modelController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.get('/', dashboardController.displayHomePage)

  router.get('/api/:tableName/', modelController.getAll)
  router.get('/api/:tableName/modelInfo/', modelController.getModelInfo)

  return router
}
