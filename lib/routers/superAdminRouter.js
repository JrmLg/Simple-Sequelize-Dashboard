const express = require('express')

// [ Controllers ]
const modelController = require('../controller/modelController')

// [ Middlewares ]
const setCurrentModelInfoInLocals = require('../middlewares/setCurrentModelInfoInLocals')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.use('/admin/', setCurrentModelInfoInLocals({ tableName: 'sd_admin' }))
  router.get('/admin/', modelController.displayTableView)
  router.get('/admin/api/', modelController.getAll)
  router.get('/admin/modelInfo/', modelController.getModelInfo)

  router.use('/permission/', setCurrentModelInfoInLocals({ tableName: 'sd_permission' }))
  router.get('/permission/', modelController.displayTableView)
  router.get('/permission/api/', modelController.getAll)
  router.get('/permission/modelInfo/', modelController.getModelInfo)

  router.use('/role/', setCurrentModelInfoInLocals({ tableName: 'sd_role' }))
  router.get('/role/', modelController.displayTableView)
  router.get('/role/api/', modelController.getAll)
  router.get('/role/modelInfo/', modelController.getModelInfo)

  router.use('/setting/', setCurrentModelInfoInLocals({ tableName: 'sd_setting' }))
  router.get('/setting/', modelController.displayTableView)
  router.get('/setting/api/', modelController.getAll)
  router.get('/setting/modelInfo/', modelController.getModelInfo)

  return router
}
