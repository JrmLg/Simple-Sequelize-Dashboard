const path = require('path')
const removeAdminViewSettings = require('./removeAdminViewSettings')

module.exports = (req, res, next) => {
  const settings = req.app.locals.settings
  if (settings?.views) {
    settings.__views = settings.views
    settings.views = path.join(__dirname, '../views')
  }

  if (settings?.['view engine']) {
    settings.__viewEngine = settings['view engine']
    settings['view engine'] = 'ejs'
  }

  req.app.locals.settings = settings
  next()

  req.on('close', () => {
    // If the request has been processed by our middleware, reset the app view settings.
    removeAdminViewSettings(req, res, () => {})
  })
}
