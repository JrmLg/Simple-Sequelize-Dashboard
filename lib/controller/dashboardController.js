const dashboardController = {
  displayHomePage(req, res) {
    const users = [
      { id: 486, firstname: 'Jérome', lastname: 'Lego', email: 'lego-jerome@gmail.com', isSuperAdmin: true },
      { id: 330, firstname: 'Théo', lastname: 'Ducourneau', email: 'theo.ducournau@gmail.com', isSuperAdmin: true },
      { id: 1332, firstname: 'Fréd', lastname: 'Fouché', email: 'fouche.fred@gmail.com', isSuperAdmin: true },
      { id: 602, firstname: 'Hernandez', lastname: 'Romain', email: 'romain.hernandez@gmail.com', isSuperAdmin: true },
      { id: 351, firstname: 'VLADISKI', lastname: 'Ives', email: 'ives.vladiski@gmail.com', isSuperAdmin: false },
    ]

    res.render('dashboardHomePage', { users })
  },

  createNewRecord(req, res) {
    res.send('Create new record')
  },
}

module.exports = dashboardController
