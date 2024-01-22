const express = require('express')

// [ Controllers ]
const dashboardController = require('../controller/dashboardController')

// [ Middlewares ]
const prepareSidebarLocals = require('../middlewares/prepareSidebarLocals')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.use(prepareSidebarLocals(sequelize, options))

  router.get('/', dashboardController.displayHomePage)

  for (const [modelName, model] of Object.entries(sequelize?.models || {})) {
    router.post(`/${model.tableName}/create`, (req, res) => {
      // Create new record for the model
    })

    router.post(`/${model.tableName}/update`, (req, res) => {
      // Update new record for the model
    })

    router.post(`/${model.tableName}/delete`, (req, res) => {
      // Delete new record for the model
    })
  }

  return router
}
