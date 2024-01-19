function loadModelsInLocals(sequelize) {
  return (req, res, next) => {
    res.locals.simpleDash = {
      models: sequelize.models,
    };

    next();
  };
}
module.exports = loadModelsInLocals;
