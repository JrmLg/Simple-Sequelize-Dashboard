// const sequelize = require("../models/sequelize/sequelize-client");
const { Quiz } = require('../models')

const quizController = {
  async renderQuizPage(req, res, next) {
    const { quizId } = req.params

    try {
      let quiz = await Quiz.findByPk(quizId, {
        include: [
          'author',
          'tags',
          {
            association: 'questions',
            include: ['propositions', 'level'],
          },
        ],
      })

      if (!quiz) {
        return next()
      }

      let date = new Date(quiz.created_at)
      quiz.formated_created_date = date.toLocaleDateString('fr', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

      res.render('quiz', { quiz })
    } catch (error) {
      console.log('Oups une erreur : ', error)
      res.status(500).render('500')
    }
  },
}

module.exports = quizController
