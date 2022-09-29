const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', taskSchema)