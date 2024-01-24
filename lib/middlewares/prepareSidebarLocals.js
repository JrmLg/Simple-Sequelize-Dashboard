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
    const { modelsInfo } = res.locals
    res.locals.sidebar = {
      categories: [
        {
          name: 'Dashboard',
          items:
            Object.values(res.locals.models)
              .filter((m) => modelsInfo[m.tableName].isSdModel)
              .filter((m) => !modelsInfo[m.tableName].isJoinTable)
              .map((m) => {
                const name = m.tableName.replace('sd_', '')
                return {
                  name,
                  url: `${options.baseUrl}/setting/${name}`,
                  isActive: false,
                }
              })
              .map(capitializeFirstLetter)
              .sort(sortByItemsName) || [],
        },
        {
          name: 'App Models',
          items:
            Object.values(res.locals.models)
              .filter((m) => !modelsInfo[m.tableName].isSdModel)
              .filter((m) => !modelsInfo[m.tableName]?.isJoinTable)
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
