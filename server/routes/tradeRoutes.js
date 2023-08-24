const { Router } = require('express')

const tradeRouter = Router()
const tradeController = require('../controllers/tradeController')

tradeRouter.get('/',tradeController.index)
tradeRouter.get('/:id', tradeController.show)
tradeRouter.post('/', tradeController.create)
tradeRouter.patch('/:id', tradeController.update)
tradeRouter.delete('/:id', tradeController.destroy)

module.exports = tradeRouter
