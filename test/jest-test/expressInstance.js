const express = require('express');
const app = express();
const path = require('path');

const sequelize = require('../jest-test/test-models/sequelizeInstance');
const useSimpleDash = require('../../index');

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

module.exports = { app, adminHomePageUrl };
