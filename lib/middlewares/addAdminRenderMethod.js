const pug = require('pug')
const path = require('path')

function addAdminRenderMethod(sequelize, options) {
  return (req, res, next) => {
    const libViewDir = path.join(__dirname, '../views')

    res.render = (view, locals) => {
      const filePath = path.join(libViewDir, view + '.pug')

      locals = {
        baseUrl: options.baseUrl,
        basedir: libViewDir,
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
  }
}

module.exports = addAdminRenderMethod
