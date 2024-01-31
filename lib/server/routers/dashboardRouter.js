const express = require('express')

// [ Middlewares ]
const setCurrentModelInfoInLocals = require('../middlewares/setCurrentModelInfoInLocals')

// [ Controllers ]
const dashboardController = require('../controller/dashboardController')
const modelController = require('../controller/modelController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.get('/tables/', dashboardController.getAllApplicationTableNames)

  router.use('/tables/:tableName/', setCurrentModelInfoInLocals({ fromParams: true }))
  router.get('/tables/:tableName/', modelController.getAll)
  router.get('/tables/:tableName/modelInfo/', modelController.getModelInfo)

  return router
}
