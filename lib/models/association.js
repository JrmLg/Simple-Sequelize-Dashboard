const adminPermission = require('./adminPermission')
const adminRole = require('./adminRole')
const adminUser = require('./adminUser')

// Association adminUser - adminRole
adminUser.belongsToMany(adminRole, {
  through: 'adminUser_has_adminRole',
  as: 'roles',
})

adminRole.belongsToMany(adminUser, {
  through: 'adminUser_has_adminRole',
  as: 'users',
})

// Association adminRole - adminPermission
adminRole.belongsToMany(adminPermission, {
  through: 'adminRole_has_adminPermission',
  as: 'permissions',
})
adminPermission.belongsToMany(adminRole, {
  through: 'adminRole_has_adminPermission',
  as: 'roles',
})

module.exports = { adminPermission, adminRole, adminUser }
