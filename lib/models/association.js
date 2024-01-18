const adminPermission = require('./adminPermission');
const adminRole = require('./adminRole');
const adminUser = require('./adminUser');
const sequelize = require('./sequelize-client');

// Association adminUser - adminRole
adminUser.belongsToMany(adminRole, {
  through: 'adminUserRole',
  as: 'roles',
});

adminRole.belongsToMany(adminUser, {
  through: 'adminUserRole',
  as: 'users',
});

// Association adminRole - adminPermission
adminRole.belongsToMany(adminPermission, {
  through: 'adminRolePermission',
  as: 'permissions',
});
adminPermission.belongsToMany(adminRole, {
  through: 'adminRolePermission',
  as: 'roles',
});

module.exports = { adminPermission, adminRole, adminUser };
