function loadModelsInLocals(sequelize) {
  return (req, res, next) => {
    res.locals.simleDash = {
      models: sequelize.models,
    }

    next()
  }
}
module.exports = loadModelsInLocals
