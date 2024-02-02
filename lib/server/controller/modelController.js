/**
 * The modelController is a generic controller that allows you to manage requests
 * on sequelize models. The model on which it applies must be defined in the
 * request premises.
 *
 * The following locals must be defined:
 * - modelInfo: The current model info of the endpoint
 * */
const modelController = {
  async getAll(req, res) {
    const Model = res.locals.modelInfo.model

    try {
      const data = await Model.findAll()
      return res.status(200).json(data)
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal server error')
    }
  },

  getModelInfo(req, res) {
    const modelInfo = res.locals.modelInfo
    return res.status(200).json(modelInfo)
  },
}

module.exports = modelController
