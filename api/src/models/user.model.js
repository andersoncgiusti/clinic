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
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     require: true
    // },
    prontuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prontuario',
        require: true
    }],
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)