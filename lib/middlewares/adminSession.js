const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);

const MINUTES = 60 * 1000;

/**
 * Middleware function for handling admin sessions.
 *
 * @param {Object} sequelize - The Sequelize instance.
 * @param {Object} options - The options for the session middleware.
 * @param {string} options.sessionName - The name of the session.
 * @param {string} options.sessionSecret - The secret used to sign the session ID cookie.
 * @param {number} options.sessionCookieMaxAge - The maximum age (in milliseconds) of the session ID cookie.
 * @param {boolean} options.sessionCookieSecure - Specifies whether the session ID cookie should be secure.
 * @returns {Function} - The session middleware function.
 */
function adminSession(
  sequelize,
  { sessionName, sessionSecret, sessionCookieMaxAge, sessionCookieSecure }
) {
  return session({
    name: sessionName,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,

    cookie: {
      secure: sessionCookieSecure,
      maxAge: sessionCookieMaxAge,
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
        };
      },
    }),
  });
}

module.exports = adminSession;
