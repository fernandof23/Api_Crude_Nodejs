const mongoose = require('mongoose')
//biblioteca de encripitar o password
const bcrypt = require('bcryptjs')

//criando o schema do banco de dados que vai salvar os usuarios
const UserSchema = new mongoose.Schema({
    name: {
        //o usuario sera tipo string e sera de campo obrigatorio
        type: String,
        require: true,
    },
    email: {
        //email de campo String, unico, obrigatorio, e sera salvo como minusculo
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        //password de tipo String, obrigatorio, e quando der um select no usuario no banco
        //esse campo password nao aparecera
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken: {
        //aqui vamos guardar o token de recuperação de senha
        type: String,
        select: false

    },
    passwordResetExpires: {
        //aqui vamos guardar a data de expiração do token
        type: Date,
        select: false,
    },
    createdAt: {
        //data de criação do registro, usando a data do momento automaticamente
        type: Date,
        default: Date.now,
    }
})

//função que chama o que agente quer q aconteça antes de salvar
//no caso vamos encripitar

//na função, chamamos antes de salvar os dados no banco, uma função que vai pegar o password, e jogar na função hash do bcrypt
//e colocar a cryptografia em 10x.. depois chamamos a função next, para proceguir normalmente
UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

//definindo o banco no model USer
const User = mongoose.model('User', UserSchema)

//exportando o banco de dados
module.exports = User