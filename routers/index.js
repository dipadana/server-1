const router = require('express').Router()
const YoutubeRouter = require('./Youtube')

router.use('/youtube', YoutubeRouter)
module.exports = router