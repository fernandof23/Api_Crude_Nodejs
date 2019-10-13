const express = require('express')
const routes = express.Router()
const CreateAuthController = require('./controllers/CreateAuthController')
const AuthenticateController = require('./controllers/AuthenticateController')
const authMiddleware = require('./middlewares/auth')
const ProjectController = require('./controllers/ProjectController')


routes.post('/auth/create', CreateAuthController.store)

routes.post('/auth/authenticate', AuthenticateController.store)

routes.post('/auth/forgot_password', AuthenticateController.forgot)

routes.post('/auth/reset_password', AuthenticateController.newPass)


//as rotas daqui para baixo precisaram estar logados para acessar
//sera necessario conter o token de autenticação no headers da requisição
routes.use(authMiddleware)

routes.get('/projects', ProjectController.show)


routes.get('/projects/:projectId', ProjectController.list)

routes.post('/projects', ProjectController.store)

routes.put('/projects/:projectId', ProjectController.update)

routes.delete('/projects/:projectId', ProjectController.delete)

module.exports = routes