/**
 * Utility function to sort items by name.
 * */
function sortByItemsName(a, b) {
  if (a.name < b.name) {
    return -1
  } else if (a.name > b.name) {
    return 1
  }
  return 0
}

/**
 * Utility function to capitialize the first letter of a string.
 * */
function capitializeFirstLetter(item) {
  return { ...item, name: item.name[0].toUpperCase() + item.name.slice(1) }
}

/**
 * This middleware prepares the sidebar locals for the dashboard.
 *
 * The sidebar render view expects an object to set its contents (see below).
 * These values can be modified in the following middleware.
 *
 * (Array) A list of categories: [
 *
 *   (Object) A category : {
 *
 *     name: (String) The name of the category displayed in sidebar,
 *     items: (Array) All child elements in this category [
 *
 *       (Object) An item : {
 *         name: (String) The name of the item displayed in sidebar,
 *         url: (String) The url of the item,
 *         isActive: (Boolean) If the item is active or not,
 *       },
 *
 *     ],
 *   },
 * ]
 * */
function prepareSidebarLocals(sequelize, options) {
  return (req, res, next) => {
    res.locals.sidebar = {
      categories: [
        {
          name: 'Admin',
          items:
            Object.values(res.locals.sdModels)
              // Don't include admin association tables
              .filter((m) => !m.tableName.includes('has') && !m.tableName.includes('setting'))
              .map((m) => {
                return {
                  name: m.tableName.replace('sd_', ''),
                  url: `${options.baseUrl}/dashboard/adminTables/${m.tableName}`,
                  isActive: false,
                }
              })
              .map(capitializeFirstLetter)
              .sort(sortByItemsName) || [],
        },
        {
          name: 'Models',
          items:
            Object.values(res.locals.appModels)
              .map((m) => {
                return {
                  name: m.tableName,
                  url: `${options.baseUrl}/dashboard/${m.tableName}`,
                  isActive: false,
                }
              })
              .map(capitializeFirstLetter)
              .sort(sortByItemsName) || [],
        },
      ],
    }
    next()
  }
}

module.exports = prepareSidebarLocals
