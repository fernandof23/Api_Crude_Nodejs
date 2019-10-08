const User = require('../models/user')
const Token = require('../config/Token')

module.exports = {
    async store(req, res) {

        try {

            const { name, email, password } = req.body

            const email_banco = await User.findOne({ email })

            //conferindo se o e-mail ja existe
            if (email_banco) {
                return res.status(400).json({ "message": "User already exists" })
            }

            //conferindo se o e-mail não é o mesmo da senha
            if (name === password) {
                return res.status(400).json({ "message": "Password can't be same as password" })
            }


            const user = await User.create({ name: name, email: email, password: password })

            //depois que criamos o e-mail, colocamos o password como undefined, para ele nao retornar na 
            //resposta da nossa api
            user.password = undefined

            return res.json({
                user,
                token: Token.generateToken({ id: user._id })
            })

        } catch (err) {
            return res.status(400).json({ erro: "Registration Failed" })
        }
    },




}