const Router = require('express').Router
const controllerLogin = require('./controllers/ControllerLogin')

const accountsRouter = Router()

// Login
accountsRouter.get('/', controllerLogin.getLogin)
accountsRouter.post('/', controllerLogin.login)
accountsRouter.get('/logout', controllerLogin.logout)

// Register
accountsRouter.get('/register', controllerLogin.getRegister)
accountsRouter.post('/register', controllerLogin.createAccount)

module.exports = accountsRouter
