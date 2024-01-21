module.exports = (req, res, next) => {
  if (req.__render) {
    req.render = req.__render
    delete req.__render
  }
  next()
}
