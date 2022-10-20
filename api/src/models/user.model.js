const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: false
    },
    userLastName: {
        type: String,
        required: false
    },
    userBirth: {
        type: String,
        required: false
    },
    userPhone: {
        type: String,
        required: false
    },
    userEmail: {
        type: String,
        required: false,
        unique: false
    },
    userCpf: {
        type: String,
        required: false
    },
    userAddress: {
        type: String,
        required: false
    },
    userNumber: {
        type: String,
        required: false
    },
    userComplement: {
        type: String,
        required: false
    },
    userCity: {
        type: String,
        required: false
    },
    userState: {
        type: String,
        required: false
    },
    userPermission: {
        type: String,
        required: false
    },
    prontuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prontuario',
        require: true
    }],
    cashs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cash',
        require: true
    }],
    agendamentos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agendamento',
        require: true
    }],
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)