const express = require('express')

const superAdminController = require('../controller/superAdminController')

module.exports = (sequelize, options) => {
  const router = express.Router()

  router.get('/admin/', superAdminController.displayAdminTable)
  router.get('/permission/', superAdminController.displayPermissionTable)
  router.get('/role/', superAdminController.displayRoleTable)
  router.get('/setting/', superAdminController.displaySettingTable)

  return router
}
