function addModelsToLocals(sequelize) {
  return (req, res, next) => {
    const appModels = {}
    const sdModels = {}

    for (const modelName in sequelize.models) {
      if (modelName.startsWith('sd_')) {
        sdModels[modelName] = sequelize.models[modelName]
      } else {
        appModels[modelName] = sequelize.models[modelName]
      }
    }
    res.locals.sdModels = sdModels
    res.locals.appModels = appModels
    next()
  }
}

module.exports = addModelsToLocals
