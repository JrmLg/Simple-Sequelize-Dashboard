function loadModelsInLocals(sequelize) {
  return (req, res, next) => {
    res.locals.models = sequelize.models;

    next();
  };
}
module.exports = loadModelsInLocals;
