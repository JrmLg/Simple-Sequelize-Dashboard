module.exports = (req, res, next) => {
  const settings = req.app.locals.settings;
  if (settings?.__views) {
    settings.views = settings.__views;
    delete settings.__views;
  }

  if (settings?.__viewEngine) {
    settings['view engine'] = settings.__viewEngine;
    delete settings.__viewEngine;
  }

  req.app.locals.settings = settings;
  next();
};
