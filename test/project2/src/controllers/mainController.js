const { Quiz } = require('../models/index')

const mainController = {
  async renderHomePage(req, res) {
    try {
      const quizzes = await Quiz.findAll({
        include: ['author', 'tags'],
        order: [
          ['title', 'ASC'],
          ['description', 'ASC'],
        ],
      })

      res.render('home', { quizzes })
    } catch (error) {
      console.log('Oups une erreur : ', error)
      res.status(500).render('500')
    }
  },
}

module.exports = mainController
