function initDashModels(sequelize) {
  const Permission = require('./Permission')(sequelize)
  const Role = require('./Role')(sequelize)
  const Admin = require('./Admin')(sequelize)
  const Setting = require('./Setting')(sequelize)

  // Association Admin - Role
  Admin.belongsToMany(Role, {
    through: 'sd_admin_has_role',
    as: 'roles',
  })

  Role.belongsToMany(Admin, {
    through: 'sd_admin_has_role',
    as: 'users',
  })

  // Association Role - Permission
  Role.belongsToMany(Permission, {
    through: 'sd_role_has_permission',
    as: 'permissions',
  })
  Permission.belongsToMany(Role, {
    through: 'sd_role_has_permission',
    as: 'roles',
  })
  return { Admin, Role, Permission, Setting }
}
module.exports = initDashModels
