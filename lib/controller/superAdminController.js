const superAdminController = {
  createUser: (req, res) => {
    res.send('Create user')
  },

  async displayAdminTable(req, res) {
    const Admin = res.locals.models.sd_admin

    try {
      const admins = await Admin.findAll()

      res.render('tableView', {
        records: admins,
        modelInfo: res.locals.modelsInfo.sd_admin,
      })
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal server error')
    }
  },

  async displayPermissionTable(req, res) {
    const Permission = res.locals.models.sd_permission

    try {
      const permissions = await Permission.findAll()

      res.render('tableView', {
        records: permissions,
        modelInfo: res.locals.modelsInfo.sd_permission,
      })
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal server error')
    }
  },

  async displayRoleTable(req, res) {
    const Role = res.locals.models.sd_role

    try {
      const roles = await Role.findAll()

      res.render('tableView', {
        records: roles,
        modelInfo: res.locals.modelsInfo.sd_role,
      })
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal server error')
    }
  },

  async displaySettingTable(req, res) {
    const Setting = res.locals.models.sd_setting

    try {
      const settings = await Setting.findAll()

      res.render('tableView', {
        records: settings,
        modelInfo: res.locals.modelsInfo.sd_setting,
      })
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal server error')
    }
  },
}

module.exports = superAdminController
