const modelController = {
  displayTableView(req, res) {
    res.render('tableView')
  },

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
}

module.exports = modelController
