const express = require('express')

// [ Controllers ]
const modelController = require('../controller/modelController')
const superAdminController = require('../controller/superAdminController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.get('/tables/', superAdminController.getAllSimpleDashTableNames)
  router.get('/tables/admin/', modelController.getAll)
  router.get('/tables/admin/modelInfo/', modelController.getModelInfo)

  router.get('/tables/api/permission/', modelController.getAll)
  router.get('/tables/permission/modelInfo/', modelController.getModelInfo)

  router.get('/tables/api/role/', modelController.getAll)
  router.get('/tables/role/modelInfo/', modelController.getModelInfo)

  router.get('/tables/api/setting/', modelController.getAll)
  router.get('/tables/setting/modelInfo/', modelController.getModelInfo)

  return router
}
