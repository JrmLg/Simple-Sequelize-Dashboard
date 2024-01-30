function updateAdminInfo(sequelize, options) {
  return async (req, res, next) => {
    const Admin = res.locals.models.sd_admin

    req.session.admin = null
    if (req.session.isAuthenticated) {
      const admin = await Admin.findByPk(req.session.adminId)

      if (admin) {
        const adminData = admin.toJSON()
        delete adminData.password
        req.session.admin = adminData
      }
    }
    next()
  }
}

module.exports = updateAdminInfo
