const router = require('express').Router()
const YoutubeController = require('../controllers/YoutubeController')

router.get('/:search', YoutubeController.searchByKeyWords)
module.exports = router