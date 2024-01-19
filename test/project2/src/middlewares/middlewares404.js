const middleware404 = (req, res) => {
  res.status(404).render('404')
}

module.exports = () => middleware404
