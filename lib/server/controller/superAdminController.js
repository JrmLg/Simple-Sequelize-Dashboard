const superAdminController = {
  getAllSimpleDashTables(req, res) {
    const tables = Array.from(Object.values(res.locals.modelsInfo))
      .filter((modelInfo) => modelInfo.isSdModel)
      .map((modelInfo) => {
        const table = { ...modelInfo }
        delete table.model
        return table
      })
      .sort((a, b) => (a.modelName.toLowerCase() < b.modelName.toLowerCase() ? -1 : 1))

    res.json(tables)
  },
}

module.exports = superAdminController
