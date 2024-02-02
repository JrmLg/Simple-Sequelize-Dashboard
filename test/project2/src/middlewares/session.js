const sequelize = require('../models/sequelize/sequelize-client')
const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store)

const MINUTES = 60 * 1000

function sessionMiddleware() {
  return session({
    name: 'user_session',
    secret: process.env.SECRET_SESSION || 'secret', // Cette clé permet de générer les tokens qui vont être stockés dans les cookies
    resave: false, // Resauvegarde la session à la fin d'une requête même si elle n'a pas été modifiée
    saveUninitialized: true, // Sauvegarder la session même si elle est vide

    cookie: {
      secure: false,
      maxAge: 20 * MINUTES,
    },

    store: new SessionStore({
      db: sequelize,
      checkExpirationInterval: 15 * MINUTES,
      expiration: 60 * MINUTES,

      extendDefaultFields: (defaults, session) => {
        return {
          data: defaults.data,
          expires: defaults.expires,
          userId: session.userId,
        }
      },
    }),
  })
}

module.exports = sessionMiddleware
