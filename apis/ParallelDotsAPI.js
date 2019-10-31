const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://apis.paralleldots.com'
})

module.exports = instance