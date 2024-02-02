const bcrypt = require('bcrypt')
const { User } = require('../models/index')

const userController = {
  // Get method
  renderSignupPage(req, res) {
    console.log("Tu veux t'inscrire !")
    res.render('signup')
  },

  // Post method
  async handleSignup(req, res) {
    const { password, confirmation } = req.body

    console.log("Tu veux t'inscrire !", req.body)

    if (password !== confirmation) {
      return res.render('signup', {
        error: 'Les mots de passes ne correspondent pas !',
        ...req.body,
      })
    }

    try {
      const user = await User.create(req.body)
      console.log(user)
      res.redirect('/user/login')
    } catch (error) {
      console.log('SQL insertion error', error)
      res.render('signup', {
        error: "L'adresse email semble déjà utilisé.",
        ...req.body,
      })
    }
  },

  renderLoginPage(req, res) {
    res.render('login')
  },

  async handleLogin(req, res) {
    // Vérifi l'utilisateur correspond bien à l'email / password
    console.log('check login', req.body)
    // findAll, findByPk, findOne

    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      })

      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.render('login', {
          error: "L'email ou le mot de passe ne correspondent pas.",
          ...req.body,
        })
      } else {
        req.session.userId = user.id
        res.redirect(req.session.redirectAfterLogin || '/')
      }
    } catch (error) {
      console.log(error)
    }
  },

  handleLogout(req, res) {
    console.log('handle logout')
    req.session.destroy()

    if (req.session?.history) {
      let history = req.session.history?.reverse()
      let url = history.find((last) => last.method === 'GET' && last.url !== req.url).url
      if (url) {
        console.log('redirect to', url)
        res.redirect(url)
        return
      }
    }
    res.redirect('/')
  },
}

module.exports = userController
