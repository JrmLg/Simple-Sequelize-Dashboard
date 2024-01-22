const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);

const MINUTES = 60 * 1000;

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
