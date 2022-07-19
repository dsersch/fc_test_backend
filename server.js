const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const express = require('express')
const morgan = require('morgan')
const { connectDB } = require('./config/database.js')

connectDB()

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.listen(3000, (err) => {
    err || console.log(`Server running on port 3000...`)
})