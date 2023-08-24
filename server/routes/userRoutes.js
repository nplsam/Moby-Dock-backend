const { Router } = require('express')
const userController = require('../controllers/userController')

const userRouter = Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.delete('/login', userController.logout);

module.exports = userRouter
