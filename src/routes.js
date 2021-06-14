const Router = require('express').Router

const  {ensureAuthenticated} = require('./middlewares/ensureAuthenticate')

const accountsRouter = require('./modules/accounts/routes')
const equipamentsRouter = require('./modules/equipaments/routes')

const routes = Router()

routes.get('/', ensureAuthenticated, (req, res) => {
  return res.redirect('/equipaments')
})

routes.use('/accounts', accountsRouter)
routes.use('/equipaments', equipamentsRouter)


module.exports = routes