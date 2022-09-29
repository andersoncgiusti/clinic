const mongoose = require('mongoose')

const physiotherapistSchema = new mongoose.Schema({
    physiotherapistName: {
        type: String,
        required: true
    },
    physiotherapistAge: {
        type: Number,
        required: true
    },
    physiotherapistCpf: {
        type: Number,
        required: true
    },
    physiotherapistAddress: {
        type: String,
        required: true
    },
    physiotherapistNumber: {
        type: Number,
        required: true
    },
    physiotherapistComplement: {
        type: String,
        required: true
    },
    physiotherapistCity: {
        type: String,
        required: true
    },
    physiotherapistState: {
        type: String,
        required: true
    },
    physiotherapistDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Fisioterapeuta', physiotherapistSchema)