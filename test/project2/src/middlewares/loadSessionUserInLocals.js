const { User } = require('../models/index')

async function loadSessionUserInLocals(req, res, next) {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId)
    res.locals.user = user
  }
  next()
}

module.exports = () => loadSessionUserInLocals
