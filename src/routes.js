const express = require('express')
const routes = express.Router()
const CreateAuthController = require('./controllers/CreateAuthController')
const AuthenticateController = require('./controllers/AuthenticateController')
const authMiddleware = require('./middlewares/auth')


routes.post('/auth/create', CreateAuthController.store)

routes.post('/auth/authenticate', AuthenticateController.store)

routes.post('/auth/forgot_password', AuthenticateController.forgot)


//as rotas daqui para baixo precisaram estar logados para acessar
//sera necessario conter o token de autenticação no headers da requisição
routes.use(authMiddleware)

routes.get('/', (req, res) => {
    res.json({ "ok": true, user: req.userId })
})


module.exports = routes