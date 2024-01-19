const isAuthed = (req, res, next) => {
  if (req.session?.userId) {
    next()
  } else {
    req.session.redirectAfterLogin = req.url

    if (req.method === 'POST') {
      let data = req.body

      let history = req.session.history?.reverse()
      if (history) {
        let url = history.find((last) => last.method === 'GET').url
        let params = Object.entries(data)
          .map(([key, value]) => `${escape(key)}=${escape(value)}`)
          .join('&')
        if (params.length > 0) {
          url += `?${params}`
        }
        req.session.redirectAfterLogin = url
      }
    }
    res.redirect('/user/login')
  }
}

module.exports = isAuthed
