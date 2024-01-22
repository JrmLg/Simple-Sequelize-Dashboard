const express = require('express');

const superAdminController = require('../middlewares/controller/superAdminController');

module.exports = (sequelize, options) => {
  const router = express.Router();

  router.get('/user/create', superAdminController.createUser);

  return router;
};
