const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const bookRoutes = require('./routes/bookRoutes')
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

api.get('/books', bookRoutes)

module.exports = api
