function loadModelsInLocals(sequelize) {
  return (req, res, next) => {
    res.locals.simpleDash = {
      models: sequelize.models,
    }
    console.log('locals: ', res.locals)
    next()
  }
}
module.exports = loadModelsInLocals
