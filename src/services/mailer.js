//aqui iremos configurar nosso serviço de e-mail
//para envio de emails!
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const { host, port, user, pass } = require('../config/mail.json')



//salvaremos os dados de host, port, pass, user no arquivo de config mail.json
const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
        user: user,
        pass: pass
    },
});

//apos configurar, baixaremos o 
//nodemailer-express-handlebars
//para usarmos os templates de e-mail

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}))



module.exports = transport