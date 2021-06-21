const Router = require('express').Router
const {ensureAuthenticated} = require('../../middlewares/ensureAuthenticate')
const equipamentController = require('./controllers/equipamentController')

const equipamentsRouter = Router()

equipamentsRouter.get('/', ensureAuthenticated, equipamentController.index)

equipamentsRouter.get('/new-equipament', ensureAuthenticated, equipamentController.getNewEquipamentPage)

equipamentsRouter.post('/new-equipament', ensureAuthenticated, equipamentController.store)


module.exports = equipamentsRouter
