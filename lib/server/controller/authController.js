const authController = {
  login: (req, res) => {
    const { email, password } = req.body
    // const Admin = res.locals

    res.json({
      message: 'success',
    })
  },

  logout: (req, res) => {
    res.json({
      message: 'success',
    })
  },
}
module.exports = authController

// async function t(req, res) {
//   const { email, password } = req.body
//   const user = await User.findOne({ where: { email } })
//
//   if (user) {
//     const loginSuccess = await bcrypt.compare(password, user.password)
//
//     if (loginSuccess) {
//       await saveUserInfoInSession(req, user)
//       res.json({ message: 'Login success.' })
//       return
//     }
//   }
//   res.status(401).json({ error: "Le mot de passe ou l'email est invalide." })
// }
