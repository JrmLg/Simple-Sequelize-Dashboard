const superAdminController = {
  getAllSimpleDashTableNames(req, res) {
    const tableNames = Array.from(Object.values(res.locals.modelsInfo))
      .filter((modelInfo) => modelInfo.isSdModel)
      .map((modelInfo) => modelInfo.tableName)
      .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))

    res.json(tableNames)
  },
}

module.exports = superAdminController
