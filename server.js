const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const express = require('express')
const morgan = require('morgan')
const { connectDB } = require('./config/database.js')

// connect database
connectDB()

// Routers
const userRouter = require('./routes/userRouter.js')
const marketRouter = require('./routes/marketRouter.js')
const voteRouter = require('./routes/voteRouter.js')

// initialize app
const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json())

// routing
app.use('/user', userRouter)
app.use('/vote', voteRouter)
app.use('/market', marketRouter)

app.listen(3000, (err) => {
    err || console.log(`Server running on port 3000...`)
})