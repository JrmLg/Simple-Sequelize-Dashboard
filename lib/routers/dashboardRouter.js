const express = require('express');

const dashboardController = require('../middlewares/controller/dashboardController');

module.exports = (sequelize, options) => {
  const router = express.Router();

  router.get('/', dashboardController.displayHomePage);

  for (const [modelName, model] of Object.entries(sequelize?.models || {})) {
    router.post(`/${model.tableName}/create`, (req, res) => {
      // Create new record for the model
    });

    router.post(`/${model.tableName}/update`, (req, res) => {
      // Update new record for the model
    });

    router.post(`/${model.tableName}/delete`, (req, res) => {
      // Delete new record for the model
    });
  }

  return router;
};
