require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routers')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.listen(PORT, () => {
    console.log(`kamu terhubung dengan ${PORT}`)
})