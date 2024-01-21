const sequelize = require('./src/models/sequelize/sequelize-client')
const useSimpleDash = require('../../lib/useSimpleDash')

// Importer les dépendances
const express = require('express')
const cookieParser = require('cookie-parser')
const router = require('./src/router')
const middleware404 = require('./src/middlewares/middlewares404')
const session = require('./src/middlewares/session')
const navigationTracker = require('./src/middlewares/navigationTracker')
const loadSessionUserInLocals = require('./src/middlewares/loadSessionUserInLocals')

// Créer une app Express
const app = express()

// Configurer EJS
app.set('view engine', 'ejs')
app.set('views', './test/project2/src/views')

app.set('trust proxy', 1)

app.use(cookieParser())

app.use(useSimpleDash(sequelize))
app.use(session())

app.use((req, res, next) => {
  console.log(req.session)
  next()
})

app.use(loadSessionUserInLocals())

// Servir statiquement le contenu du dossier public
app.use(express.static('./public'))

// On configure express pour récupérer les données du body envoyées par nos formulaires
app.use(express.urlencoded({ extended: true }))

app.use(navigationTracker())
app.use(router)

// page 404
app.use(middleware404())

// Lancer le serveur
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`)
})
