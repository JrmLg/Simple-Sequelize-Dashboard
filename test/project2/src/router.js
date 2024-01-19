const isAuthed = require('./middlewares/isAuthed')
const { Router } = require('express')

const mainController = require('./controllers/mainController')
const levelController = require('./controllers/levelController')
const quizController = require('./controllers/quizController')
const tagsController = require('./controllers/tagsController')
const userController = require('./controllers/userController')

// Créer un router
const router = Router()

// Le configurer
router.get('/', mainController.renderHomePage)

router.get('/levels', levelController.renderLevelsPage)
router.get('/levels/edit/:levelId', isAuthed, levelController.RenderEditLevelPage)
router.post('/levels/add', isAuthed, levelController.addLevel)
router.post('/levels/delete/:levelId', isAuthed, levelController.deleteLevel)
router.post('/levels/edit/:levelId', isAuthed, levelController.editLevel)

router.get('/quiz/:quizId', quizController.renderQuizPage)
router.get('/tags', tagsController.renderTagsPage)

// Gestion de l'inscription et de la connexion
router.get('/user/signup', userController.renderSignupPage)
router.post('/user/signup', userController.handleSignup)
router.get('/user/login', userController.renderLoginPage)
router.post('/user/login', userController.handleLogin)
router.get('/user/logout', userController.handleLogout)
// L'exporter
module.exports = router
