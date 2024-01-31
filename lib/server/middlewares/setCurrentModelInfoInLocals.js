function setCurrentModelInfoInLocals({ tableName, fromParams = false }) {
  return (req, res, next) => {
    if (fromParams) {
      tableName = req.params.tableName
    }
    const modelInfo = res.locals.modelsInfo[tableName]
    res.locals.modelInfo = modelInfo
    next()
  }
}

module.exports = setCurrentModelInfoInLocals
