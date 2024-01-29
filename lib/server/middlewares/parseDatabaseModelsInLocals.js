function parseDatabaseModelsInLocals(sequelize, options) {
  return (req, res, next) => {
    res.locals.modelsInfo = {}

    for (const [tableName, model] of Object.entries(sequelize?.models)) {
      const modelInfo = {
        model,
        tableName,
        fields: {},
      }

      for (const [fieldName, field] of Object.entries(model.rawAttributes)) {
        modelInfo.fields[fieldName] = {
          isEditable: !field.primaryKey,
          isDisplayed: true,
          allowNull: field.allowNull,

          type: field.type.constructor.key,
          stringLength: field.type.options?._length,

          // [ ForeignKey Info ]
          isForeignKey: field?.references ? true : false,
          referenceModel: field?.references?.model,
          referenceField: field?.references?.key,

          min: field.min,
          max: field.max,
        }
        // console.log(fieldName, field)
      }

      // console.log(modelInfo)
      res.locals.modelsInfo[tableName] = modelInfo
    }

    next()
  }
}

module.exports = parseDatabaseModelsInLocals
