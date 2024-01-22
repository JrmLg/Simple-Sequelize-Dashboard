function prepareSidebarLocals(sequelize, options) {
  return (req, res, next) => {
    res.locals.sidebar = {
      categories: [
        {
          name: 'Admin',
          items: [
            {
              name: 'Users',
              url: `${options.baseUrl}/dashboard/adminTables/users`,
              isActive: false,
            },
            {
              name: 'Roles',
              url: `${options.baseUrl}/dashboard/adminTables/roles`,
              isActive: false,
            },
            {
              name: 'Permissions',
              url: `${options.baseUrl}/dashboard/adminTables/Permissions`,
              isActive: false,
            },
          ],
        },
        {
          name: 'Models',
          items:
            Object.values(sequelize?.models).map((m) => {
              return {
                name: m.tableName,
                url: `${options.baseUrl}/dashboard/${m.tableName}`,
                isActive: false,
              }
            }) || [],
        },
      ],
    }
    next()
  }
}

module.exports = prepareSidebarLocals
