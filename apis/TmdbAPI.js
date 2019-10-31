const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

module.exports = instance