const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userBirth: {
        type: String,
        required: false
    },
    userPhone: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    userCpf: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: false
    },
    userNumber: {
        type: String,
        required: true
    },
    userComplement: {
        type: String,
        required: true
    },
    userCity: {
        type: String,
        required: true
    },
    userState: {
        type: String,
        required: true
    },
    userPermission: {
        type: String,
        required: true
    },
    password: { 
        type: String, 
        required: false,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false,
        // required: false 
    },
    passwordResetExpires: {
        type: Date,
        select: false,
        // required: false 
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
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        require: true
    }],
    totals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Total',
        require: true
    }],
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)