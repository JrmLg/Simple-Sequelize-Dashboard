const dashboardController = {
  displayHomePage(req, res) {
    res.render('dashboardHomePage')
  },

  createNewRecord(req, res) {
    res.send('Create new record')
  },
}

module.exports = dashboardController
