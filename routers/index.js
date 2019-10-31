const router = require('express').Router()
const YoutubeController = require('../controllers/YoutubeController')

router.post('/', YoutubeController.findByEmotion)
router.get('/', YoutubeController.findMovie)
router.get('/:movieId', YoutubeController.searchByKeyWords)
module.exports = router