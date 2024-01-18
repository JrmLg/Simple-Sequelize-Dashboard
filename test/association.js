const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const adminPermission = require('./adminPermission');
const adminRole = require('./adminRole');
const adminUser = require('./adminUser');

// la table de jointure UserRole
adminUser.belongsToMany(adminRole, { through: 'UserRole' });
adminRole.belongsToMany(adminUser, { through: 'UserRole' });

// la table de jointure RolePermission
adminRole.belongsToMany(adminPermission, { through: 'RolePermission' });
adminPermission.belongsToMany(adminRole, { through: 'RolePermission' });

module.exports = { adminPermission, adminRole, adminUser };
