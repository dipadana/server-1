const router = require('express').Router()
const YoutubeController = require('../controllers/YoutubeController')

router.get('/', YoutubeController.searchByKeyWords)
module.exports = router