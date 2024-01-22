const authController = {
  displayLoginPage(req, res) {
    res.send('display login page')
  },

  handleLogin(req, res) {
    res.send('Handle login')
  },

  handleLogout(req, res) {
    res.send('Handle logout')
  },
}

module.exports = authController
