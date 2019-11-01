require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routers')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// connect to mongoose
mongoose.connect('mongodb://localhost/project_week1', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
    .then(() => {
        console.log(`server is connected !!`)
    })
    .catch( err => {
        console.log(err)
    })

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`kamu terhubung dengan ${PORT}`)
})