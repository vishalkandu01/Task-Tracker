const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        deadline: {
            type: Date,
            default: Date.now
        }
    }
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task