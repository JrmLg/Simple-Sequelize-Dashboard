const { Level } = require('../models')

const levelController = {
  async renderLevelsPage(req, res) {
    let error = req.session.levelError
    if (error) {
      req.session.levelError = null
    }

    try {
      const levels = await Level.findAll({
        order: [
          ['power', 'ASC'],
          ['name', 'ASC'],
        ],
      })
      res.render('levels', {
        ...req.query,
        levels,
        error,
      })
    } catch (error) {
      console.error(error)
      res.status(500).render('500')
    }
  },

  async RenderEditLevelPage(req, res) {
    let { levelId } = req.params

    try {
      const level = await Level.findByPk(levelId)

      if (level) {
        res.render('level', { level })
      }
    } catch (error) {
      res.status(500).render('500')
    }
  },

  async addLevel(req, res) {
    try {
      await Level.create({ name: req.body.levelName })
      res.redirect('/levels')
    } catch (error) {
      console.log('SQL insertion error', error)
      req.session.levelError = 'Le niveau existe déjà.'
      res.redirect('/levels')
    }
  },

  async deleteLevel(req, res) {
    const { levelId } = req.params
    try {
      await Level.destroy({
        where: {
          id: levelId,
        },
      })
      res.redirect('/levels')
    } catch (error) {
      console.error(error)
      res.status(500).render('500')
    }
  },

  async editLevel(req, res) {
    const { levelId } = req.params
    try {
      Level.update(
        {
          ...req.body,
        },
        {
          where: {
            id: levelId,
          },
        },
      )

      res.redirect('/levels')
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  },
}

module.exports = levelController
