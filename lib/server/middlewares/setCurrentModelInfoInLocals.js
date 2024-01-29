function setCurrentModelInfoInLocals({ tableName = '', fromParams = false }) {
  return (req, res, next) => {
    if (fromParams) {
      tableName = req.params.tableName
    }
    res.locals.modelInfo = res.locals.modelsInfo[tableName]
    next()
  }
}

module.exports = setCurrentModelInfoInLocals
