const path = require('path');
const removeAdminViewSettings = require('./removeAdminViewSettings');

module.exports = (req, res, next) => {
  const settings = req.app.locals.settings;
  console.log('settings', settings);

  /**
   * Répertoire contenant les vues du module.
   * @type {string}
   */
  const libViewDir = path.join(__dirname, '../views');
  const libViewEngine = 'ejs';

  if (settings?.views && settings.views !== libViewDir) {
    settings.__views = settings.views;
    settings.views = libViewDir;
  }

  if (settings?.['view engine'] && settings['view engine'] !== libViewEngine) {
    settings.__viewEngine = settings['view engine'];
    settings['view engine'] = libViewEngine;
  }

  req.app.locals.settings = settings;
  next();

  req.on('close', () => {
    // If the request has been processed by our middleware, reset the app view settings.
    removeAdminViewSettings(req, res, () => {});
  });
};
