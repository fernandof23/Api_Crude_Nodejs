const Task = require('../models/task')
const Project = require('../models/projects')
const User = require('../models/user')


module.exports = {
    async show(req, res) {
        res.json({ ok: true, message: "Listando todos", user: req.userId })
    },


    async list(req, res) {
        res.json({ ok: true, message: "Mostrando 1", user: req.userId })
    },

    async store(req, res) {
        try {
            const { tittle, description } = req.body
            console.log(tittle, description, req.userId)
            const project = await Project.create({ tittle: tittle, description: description, user: req.userId })
            return res.json({ project })

        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: "Error creating new project" })
        }
    },


    async update(req, res) {
        res.json({ ok: true, message: "Atualizado", user: req.userId })
    },

    async delete(req, res) {
        res.json({ ok: true, message: "Deletado", user: req.userId })
    }





}