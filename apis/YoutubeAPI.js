const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
})

module.exports = instance