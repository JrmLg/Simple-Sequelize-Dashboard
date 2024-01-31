const express = require('express')

// [ Middlewares ]
const setCurrentModelInfoInLocals = require('../middlewares/setCurrentModelInfoInLocals')

// [ Controllers ]
const modelController = require('../controller/modelController')
const superAdminController = require('../controller/superAdminController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.use('/tables/:tableName/', setCurrentModelInfoInLocals({ fromParams: true }))

  router.get('/tables/', superAdminController.getAllSimpleDashTables)
  router.get('/tables/sd_admin/', modelController.getAll)
  router.get('/tables/sd_admin/modelInfo/', modelController.getModelInfo)

  router.get('/tables/sd_permission/', modelController.getAll)
  router.get('/tables/sd_permission/modelInfo/', modelController.getModelInfo)

  router.get('/tables/sd_role/', modelController.getAll)
  router.get('/tables/sd_role/modelInfo/', modelController.getModelInfo)

  router.get('/tables/sd_setting/', modelController.getAll)
  router.get('/tables/sd_setting/modelInfo/', modelController.getModelInfo)

  return router
}
