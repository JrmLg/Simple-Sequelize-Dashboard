function navigationTracker(req, res, next) {
  next()
  req.on('close', () => {
    if (req.session) {
      const history = req.session?.history?.slice(-10) || []
      history.push({
        url: req.url,
        method: req.method,
        body: req.body,
      })
      req.session.history = history
      req.session.save()
    }
  })
}

module.exports = () => navigationTracker
