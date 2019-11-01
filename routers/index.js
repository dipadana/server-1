const router = require('express').Router()
const YoutubeController = require('../controllers/YoutubeController')
const userController = require('../controllers/userController')
const loginGoogle = require('../middlewares/googleLogin')

router.post('/', YoutubeController.findByEmotion)
router.get('/:movieId', YoutubeController.searchByKeyWords)
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/login-google', loginGoogle, userController.loginGoogle)

module.exports = router