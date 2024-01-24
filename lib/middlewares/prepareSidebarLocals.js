function prepareSidebarLocals(sequelize, options) {
  return (req, res, next) => {
    res.locals.sidebar = {
      categories: [
        {
          name: 'Admin',
          items:
            Object.values(res.locals.sdModels).map((m) => {
              return {
                name: m.tableName.replace('sd_', ''),
                url: `${options.baseUrl}/dashboard/adminTables/${m.tableName}`,
                isActive: false,
              }
            }) || [],
        },
        {
          name: 'Models',
          items:
            Object.values(res.locals.appModels).map((m) => {
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
