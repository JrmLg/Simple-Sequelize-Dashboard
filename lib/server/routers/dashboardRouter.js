const express = require('express')

// [ Middlewares ]
const setCurrentModelInfoInLocals = require('../middlewares/setCurrentModelInfoInLocals')

// [ Controllers ]
const dashboardController = require('../controller/dashboardController')
const modelController = require('../controller/modelController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.get('/tables/', dashboardController.getAllApplicationTables)

  for (const [modelName, model] of Object.entries(sequelize?.models)) {
    const tableName = model.tableName
    if (tableName.startsWith('sd_')) continue

    router.use(`/tables/${tableName}`, setCurrentModelInfoInLocals({ tableName }))
    router.get(`/tables/${tableName}/`, modelController.getAll)
    router.get(`/tables/${tableName}/modelInfo/`, modelController.getModelInfo)
  }

  return router
}
