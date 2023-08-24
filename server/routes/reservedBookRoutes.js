const { Router } = require('express')

const reservedBookRouter = Router()
const authenticator = require('../middleware/authenticator')
const reservedBookController = require('../controllers/reservedBookController')

reservedBookRouter.get('/',reservedBookController.index)
reservedBookRouter.get('/:id', reservedBookController.showById)
reservedBookRouter.post('/', reservedBookController.create)
reservedBookRouter.delete('/:id', reservedBookController.destroy)


module.exports = reservedBookRouter
