const authController = {
  async login(req, res) {
    const { email, password } = req.body

    const Admin = res.locals.models.sd_admin

    const admin = await Admin.findOne({ where: { email } })

    if (admin && admin.passwordMatch(password)) {
      req.session.isAuthenticated = true
      req.session.adminId = admin.id

      const adminData = admin.toJSON()
      delete adminData.password

      res.json({
        admin: adminData,
        isAuthenticated: true,
      })
      return
    }

    res.status(401).json({
      admin: null,
      isAuthenticated: false,
      error: 'Invalid email or password.',
    })
  },

  logout(req, res) {
    req.session.isAuthenticated = false
    req.session.adminId = null
    res.json({ message: 'success' })
  },

  async me(req, res) {
    if (req.session.isAuthenticated) {
      return res.json({
        admin: req.session.admin,
        isAuthenticated: true,
      })
    }
    res.json({
      admin: null,
      isAuthenticated: false,
    })
  },
}
module.exports = authController
