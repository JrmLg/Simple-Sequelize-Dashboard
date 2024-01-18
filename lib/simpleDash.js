const getDashRouter = require('./routers/simpleDashRouter')

class SimpleDash {
  /**
   * @param {Sequelize} sequelize instance
   * @param {Object} options
   * */
  constructor(sequelize, options) {
    this.sequelize = sequelize
    this.options = {
      baseUrl: '/admin',
      ...options,
    }

    this.router = getDashRouter(sequelize, this.options)
  }

  get useAdminPanel() {
    return this.router
  }
}

module.exports = SimpleDash
