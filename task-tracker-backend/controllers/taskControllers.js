const Task = require('../models/taskSchema')

const getTask = async (req, res) => {
    try {
        const task = await Task.find();
        return res
        .status(200)
        .json({
            task
        })
    } catch(error) {
        return res
        .status(400)
        .json({
            message: "get task error",
            error
        })
    }
}

const postTask = async (req, res) => {
    try {
        const {title, description} = req.body;

        if(!title || !description) {
            return res.json({
                Message: "Give Title and Description both"
            })
        }

        const newPost = await Task.save(
            {
                title, 
                description
            }
        )

        return res
        .status(200)
        .json({
            message: "new task is added"
        })
    } catch (error) {
        return res
        .status(400)
        .json({
            message: "post task error"
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updateData = {
            title: req.body.title,
            description: req.body.description
        }
        Task.findById(taskId, updateData)
        return res
        .status(200)
        .json({
            message: "task is updated"
        })
    } catch (error) {
        return res
        .status(400)
        .json({
            message: "update task error"
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        Task.findByIdAndDelete({_id:taskId})
        return res
        .status(200)
        .json({
            message: `task id:${taskId} is deleted`
        })
    } catch (error) {
        return res
        .status(400)
        .json({
            message: "delete task error"
        })
    }
}

module.exports = {
    getTask,
    postTask,
    updateTask,
    deleteTask
}