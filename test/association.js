const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const adminPermission = require('./adminPermission');
const adminRole = require('./adminRole');
const adminUser = require('./adminUser');

// un administrateur a un rôle
adminUser.belongsTo(adminRole, {
  foreignKey: 'adminRole_Id',
  as: 'adminRole',
});
adminRole.hasMany(adminUser, {
  foreignKey: 'adminRole_Id',
  as: 'adminUser',
});

// un rôle a plusieurs permissions
adminRole.belongsToMany(adminPermission,
    {
        through: 'RolePermission',

    }
  
