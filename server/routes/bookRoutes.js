const { Router } = require('express')

const bookRouter = Router()
const bookController = require('../controllers/bookController')

bookRouter.get('/', bookController.index)
bookRouter.get('/genre/:genre', bookController.findByGenre)
bookRouter.get('/:id', bookController.show)
bookRouter.get('/name/:name', bookController.findByName)
bookRouter.post('/', bookController.create)
bookRouter.patch('/:id', bookController.update)
bookRouter.delete('/:id', bookController.destroy)

module.exports = bookRouter
