const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')


mongoose.connect('mongodb://hadesknight:fernando23@kamino.mongodb.umbler.com:50046/meuprojeto', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})



const app = express()


//definindo que o nosso app vai usar a função do bodyparser para ouvir requisições json
app.use(express.json())



app.use(routes)






app.listen('3333')