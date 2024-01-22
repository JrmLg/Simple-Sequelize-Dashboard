const express = require('express');
const app = express();
const path = require('path');

const sequelize = require('../jest-test/test-models/sequelizeInstance');
const useSimpleDash = require('../../lib/useSimpleDash');

app.set('view engine', 'ejs');
app.set('views', './test/project1/app/views');

app.use(express.urlencoded({ extended: true }));

// Statically served files
app.use(express.static(path.join(__dirname, './public')));

const adminHomePageUrl = '/administration';

app.use(
  useSimpleDash(sequelize, {
    baseUrl: adminHomePageUrl,
  })
);

app.get('/', (req, res) => {
  res.render('homePage', { adminHomePageUrl });
});

function closeDatabaseConnection() {
  return sequelize.close();
}

module.exports = { app, adminHomePageUrl, closeDatabaseConnection };
