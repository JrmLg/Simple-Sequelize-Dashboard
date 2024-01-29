function addModelsToLocals(sequelize) {
  return (req, res, next) => {
    res.locals.models = {}

    for (const model of Object.values(sequelize?.models)) {
      res.locals.models[model.tableName] = model
    }
    next()
  }
}

module.exports = addModelsToLocals
