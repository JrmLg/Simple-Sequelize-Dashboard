const request = require('supertest');
const express = require('express');
const path = require('path');
const removeAdminViewSettings = require('../../../lib/middlewares/removeAdminViewSettings');
const loadModelsInLocals = require('../../../lib/middlewares/loadModelsInLocals');
const setAdminViewSettings = require('../../../lib/middlewares/setAdminViewSettings');

describe('loadModelsInLocals', () => {
  it('should add models to res.locals', () => {
    const models = { model1: {}, model2: {} };
    const sequelize = { models };
    const req = {};
    const res = { locals: {} };
    const next = jest.fn();

    loadModelsInLocals(sequelize)(req, res, next);

    expect(res.locals.simpleDash.models).toEqual(models);
    expect(next).toHaveBeenCalled();

    console.log(res.locals);
    console.log(res.locals.simpleDash);
  });
});

jest.mock('../../../lib/middlewares/removeAdminViewSettings', () =>
  jest.fn((req, res, next) => next())
);

describe('set/remove AdminViewSettings', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    app.use(setAdminViewSettings);
    app.use(removeAdminViewSettings);

    app.get('/', (req, res) => {
      res.status(200).send('Test route');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setAdminViewSettings test', () => {
    let app, originalSettings;

    beforeEach(() => {
      app = express();
      app.use(express.json());

      originalSettings = {
        views: 'originalViewsPath',
        'view engine': 'originalEngine',
      };

      app.use((req, res, next) => {
        req.app.locals.settings = { ...originalSettings };
        next();
      });

      app.use(setAdminViewSettings);

      app.get('/', (req, res) => {
        res.status(200).send('Test route');
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should modify view settings and call next', async () => {
      const libViewDir = path.join(__dirname, '../../../lib/views');
      await request(app).get('/');

      const settings = app.locals.settings;
      expect(settings.views).toBe(libViewDir);
      expect(settings['view engine']).toBe('ejs');
    });

    test('should call removeAdminViewSettings on request close', async () => {
      const response = await request(app).get('/');

      response.req.emit('close');
      expect(removeAdminViewSettings).toHaveBeenCalled();
    });
  });
});
