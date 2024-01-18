const dashboardController = {
  displayHomePage: (req, res) => {
    res.send('admin/home')
  },

  createNewRecord(req, res) {},
}

module.exports = dashboardController
