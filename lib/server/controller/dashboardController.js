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

  // All this data are mocked
  displayHomePage(req, res) {
    const records = [
      { id: 486, firstname: 'Jérome', lastname: 'Lego', email: 'lego-jerome@gmail.com', isSuperAdmin: true },
      { id: 330, firstname: 'Théo', lastname: 'Ducourneau', email: 'theo.ducournau@gmail.com', isSuperAdmin: true },
      { id: 1332, firstname: 'Fréd', lastname: 'Fouché', email: 'fouche.fred@gmail.com', isSuperAdmin: true },
      { id: 602, firstname: 'Hernandez', lastname: 'Romain', email: 'romain.hernandez@gmail.com', isSuperAdmin: true },
      { id: 351, firstname: 'VLADISKI', lastname: 'Ives', email: 'ives.vladiski@gmail.com', isSuperAdmin: false },
    ]

    res.render('tableView', {
      records,
      modelInfo: {
        tableName: 'Users',
        fields: {
          id: {
            isEditable: false,
            isDisplayed: true,
            allowNull: false,
            type: 'INTEGER',
            stringLength: 32,
            isForeignKey: false,
            referenceModel: undefined,
            referenceField: undefined,
            min: undefined,
            max: undefined,
          },
          firstname: {
            isEditable: true,
            isDisplayed: true,
            allowNull: true,
            type: 'STRING',
            stringLength: 255,
            isForeignKey: false,
            referenceModel: undefined,
            referenceField: undefined,
            min: undefined,
            max: undefined,
          },
          lastname: {
            isEditable: true,
            isDisplayed: true,
            allowNull: true,
            type: 'STRING',
            stringLength: 255,
            isForeignKey: false,
            referenceModel: undefined,
            referenceField: undefined,
            min: undefined,
            max: undefined,
          },
          email: {
            isEditable: true,
            isDisplayed: true,
            allowNull: true,
            type: 'STRING',
            stringLength: 255,
            isForeignKey: false,
            referenceModel: undefined,
            referenceField: undefined,
            min: undefined,
            max: undefined,
          },
          isSuperAdmin: {
            isEditable: true,
            isDisplayed: true,
            allowNull: true,
            type: 'BOOLEAN',
            stringLength: undefined,
            isForeignKey: false,
            referenceModel: undefined,
            referenceField: undefined,
            min: undefined,
            max: undefined,
          },
        },
      },
      // modelInfo: res.locals.modelInfo.Users,
    })
  },
}

module.exports = dashboardController