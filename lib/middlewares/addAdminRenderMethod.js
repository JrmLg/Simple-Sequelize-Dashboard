const pug = require('pug')
const path = require('path')
const removeAdminRenderMethod = require('./removeAdminRenderMethod')

function addAdminRenderMethod(sequelize, options) {
  return (req, res, next) => {
    const libViewDir = path.join(__dirname, '../views')

    res.__render = res.render
    res.render = (view, locals) => {
      const filePath = path.join(libViewDir, view + '.pug')

      locals = {
        baseUrl: options.baseUrl,
        basedir: libViewDir,
        models: sequelize.models,
        ...res.app.locals,
        ...locals,
      }

      pug.renderFile(filePath, { ...res.locals, ...locals }, (err, html) => {
        if (err) {
          console.log(err)
          return res.status(500).send('Erreur de rendu Pug : ' + JSON.stringify(err))
        }

        res.send(html)
      })
    }

    next()

    req.on('close', () => {
      removeAdminRenderMethod(req, res, () => {})
    })
  }
}

module.exports = addAdminRenderMethod
