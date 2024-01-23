const authController = {
  displayLoginPage(req, res) {
    console.log('Display login page');
    res.render('login');
  },

  handleLogin(req, res) {
    res.send('Handle login');
  },

  handleLogout(req, res) {
    res.send('Handle logout');
  },
};

module.exports = authController;
