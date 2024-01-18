const { Router } = require('express')

class SimpleDash {
  /**
   * @param {Sequelize} sequelize instance
   * @param {Object} options
   * */
  constructor(sequelize, options) {
    this.sequelize = sequelize
    this.router = Router()
    this.options = {
      baseUrl: '/admin',
      ...options,
    }

    this._setupRoutesUrl()
  }

  _setupRoutesUrl() {
    this.router.get('/admin/login', (req, res) => {
      res.send('admin/login')
    })
  }

  get useAdminPanel() {
    return this.router
  }
}

module.exports = SimpleDash
