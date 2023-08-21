const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const bookRouter = require('./routes/bookRoutes')
const userRouter = require('./routes/userRoutes')

const api = express()

api.use(cors())
api.use(express.json())
api.use(logger('dev'))

api.get('/', (req, res) => {
    res.json({
        name: "moby-dock API",
        description: "Lots of books!"
    })
})

api.get('/books', bookRouter)
api.get('/users', userRouter)

module.exports = api
