const dashboardController = {
  displayLoginPage(req, res) {
    res.send('display login page')
  },

  handleLogin(req, res) {
    res.send('Handle login')
  },

  handleLogout(req, res) {
    res.send('Handle logout')
  },

  displayHomePage(req, res) {
    res.sendFile('index.html')
  },
}

module.exports = dashboardController
