const mongoose = require('mongoose')


const Projectschema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        //Fazendo a ligação entre os bancos, pegando o ID do usuario no banco referenciado
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    createAt: {
        type: Date,
        default: Date.now,
    },
})


const Project = mongoose.model("Project", Projectschema)

module.exports = Project;