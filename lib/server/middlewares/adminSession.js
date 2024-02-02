const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const MINUTES = 60 * 1000

function adminSession(sequelize, { baseUrl, sessionName, sessionSecret, sessionCookieMaxAge, sessionCookieSecure }) {
  const sessionMiddleware = session({
    name: sessionName,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,

    cookie: {
      secure: sessionCookieSecure,
      maxAge: sessionCookieMaxAge,
    },

    store: new SequelizeStore({
      db: sequelize,
      tableName: 'sd_admin_session',
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

  return (req, res, next) => {
    // Remove app session if it exists
    // Because the application session can be mounted on the same url as our middleware.
    if (req.session) {
      delete req.session
    }

    return sessionMiddleware(req, res, next)
  }
}

module.exports = adminSession
