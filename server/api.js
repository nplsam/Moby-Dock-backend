const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const bookRouter = require('./routes/bookRoutes')
const userRouter = require('./routes/userRoutes')
const tradeRouter = require('./routes/tradeRoutes')

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

api.use('/books', bookRouter)
api.use('/users', userRouter)
api.use('/account', reservedBookRouter)
api.use('/trades', tradeRouter)

module.exports = api
