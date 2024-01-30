function parseModelsInfoInLocals(sequelize, options) {
  return (req, res, next) => {
    res.locals.modelsInfo = {}
    res.locals.models = {}

    for (const [modelName, model] of Object.entries(sequelize?.models)) {
      const tableName = model.tableName
      const modelInfo = {
        model,
        tableName,
        modelName,
        isJoinTable: model.options.through ? true : false,
        isSdModel: tableName.startsWith('sd_'),
        fields: {},
        fieldsOrder: [],
      }

      for (const [fieldName, field] of Object.entries(model.rawAttributes)) {
        modelInfo.fieldsOrder.push(fieldName)
        modelInfo.fields[fieldName] = {
          isEditable: !field.primaryKey && !model._readOnlyAttributes.has(fieldName),
          isDisplayed: true,
          allowNull: field.allowNull,

          type: field.type.constructor.ey,
          stringLength: field.type.options?._length,

          // [ ForeignKey Info ]
          isForeignKey: field?.references ? true : false,
          referenceModel: field?.references?.model,
          referenceField: field?.references?.ey,

          min: field.min,
          max: field.max,
        }

        // console.log(fieldName, field)
      }

      // console.log(modelInfo)
      res.locals.modelsInfo[tableName] = modelInfo
      res.locals.models[tableName] = model
    }
    next()
  }
}

module.exports = parseModelsInfoInLocals
