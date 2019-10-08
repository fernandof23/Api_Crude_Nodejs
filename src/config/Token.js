//para gerar o toque de sessão vamos usar o jsonwebtoken
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')


module.exports = {
    generateToken(params = {}) {
        return jwt.sign(params, authConfig.secret, { expiresIn: 86400 })
    }
}