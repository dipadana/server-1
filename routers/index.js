const router = require('express').Router()
const YoutubeRouter = require('./Youtube')
const YoutubeController = require('../controllers/YoutubeController')

router.use('/youtube', YoutubeRouter)
router.post('/test', YoutubeController.findByEmotion)
router.get('/', YoutubeController.findMovie)
module.exports = router