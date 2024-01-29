const express = require('express')

// [ Controllers ]
const dashboardController = require('../controller/dashboardController')
const modelController = require('../controller/modelController')

// [ Middlewares ]
const setCurrentModelInfoInLocals = require('../middlewares/setCurrentModelInfoInLocals')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.get('/', dashboardController.displayHomePage)

  router.use('/:tableName/', setCurrentModelInfoInLocals({ fromParams: true }))
  router.get('/:tableName/', modelController.displayTableView)
  router.get('/:tableName/api/', modelController.getAll)
  router.get('/:tableName/modelInfo/', modelController.getModelInfo)

  return router
}
