const mongoose = require('mongoose')

const Taskschema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


const Task = mongoose.model("Task", Taskschema)

module.exports = Task;