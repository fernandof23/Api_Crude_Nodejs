const Task = require('../models/task')
const Project = require('../models/projects')
const User = require('../models/user')


module.exports = {
    async show(req, res) {
        try {
            const projects = await Project.find().populate(['user', 'tasks'])
            return res.json({ projects })
        } catch (err) {
            return res.status(400).json({ error: "Impossible to show projects" })
        }
    },


    async list(req, res) {
        try {
            const project = await Project.findById(req.params.projectId).populate(['user', 'tasks'])
            return res.json({ project })

        } catch (err) {
            return res.status(400).json({ error: "Impossible do Load a project" })
        }
    },

    async store(req, res) {
        try {
            const { tittle, description, tasks } = req.body
            const project = await Project.create({ tittle: tittle, description: description, user: req.userId })

            //adicionando agora as tasks separadamente
            await Promise.all(tasks.map(async task => {
                const projectTask = new Task({ tittle: task.tittle, assignedTo: task.assignedTo, project: project._id })
                await projectTask.save()
                project.tasks.push(projectTask)
            }))

            await project.save();
            return res.json({ project })

        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: "Error creating new project" })
        }
    },


    async update(req, res) {
        try {
            const { tittle, description, tasks } = req.body
            const project = await Project.findByIdAndUpdate(req.params.projectId, {
                tittle, description
            }, { new: true })
            project.tasks = [];


            await Task.deleteMany({ project: project._id })

            await Promise.all(tasks.map(async task => {
                const projectTask = new Task({ tittle: task.tittle, assignedTo: task.assignedTo, project: project._id })
                await projectTask.save()
                project.tasks.push(projectTask)
            }))



            await project.save()

            return res.json({ project })

        } catch (err) {
            return res.status(400).json({ error: "Impossible to update" })
        }
    },

    async delete(req, res) {
        try {
            const delete_task = await Project.findById(req.params.projectId)
            await Task.deleteMany({ project: delete_task._id })
            const project = await Project.findByIdAndRemove(req.params.projectId)

            return res.json({ project })
        } catch (err) {
            return res.status(400).json({ error: "Impossible to delete this project, or project do not exists" })
        }
    }





}