const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')


//aqui vamos criar nosso modulo certificação de login
//vamos conferir a autenticidade do token utilizado
module.exports = (req, res, next) => {
    //pegando o toquen que vem no cabeçalho da requisição
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" })
    }

    //o token jwt sempre começa com Bearer
    //vammos conferir se esta correto, duas partes, começando com o Bearer
    //separando ele em 2 partes
    const parts = authHeader.split(" ")

    if (!parts.length === 2) {
        return res.status(401).json({ error: "Token error" })
    }

    //agora conferindo se a primeira parte tem Beared
    const [scheme, token] = parts

    //conferindo se o token começa com a palavra Bearer.. usando regex
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: "Token Malformatted" })
    }

    //agora vamos conferir o jwt finalmente
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token Invalid" })
        }
        req.userId = decoded.id
        return next()
    })

}