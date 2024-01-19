// const sequelize = require("../models/sequelize/sequelize-client");
const { Tag } = require('../models')

const tagsController = {
  async renderTagsPage(req, res) {
    const tags = await Tag.findAll({
      include: ['quizzes'],
    })

    res.render('tags', { tags })
  },
}

module.exports = tagsController
