const express = require('express')

// [ Controllers ]
const modelController = require('../controller/modelController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.get('/api/admin/', modelController.getAll)
  router.get('/api/admin/modelInfo/', modelController.getModelInfo)

  router.get('/api/api/permission/', modelController.getAll)
  router.get('/api/permission/modelInfo/', modelController.getModelInfo)

  router.get('/api/api/role/', modelController.getAll)
  router.get('/api/role/modelInfo/', modelController.getModelInfo)

  router.get('/api/api/setting/', modelController.getAll)
  router.get('/api/setting/modelInfo/', modelController.getModelInfo)

  return router
}
