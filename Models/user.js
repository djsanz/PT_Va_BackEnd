const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    dorsal: {
        type: Number,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        unique: false,
        required: false
    },
    posicion: {
        type: String,
        unique: false,
        required: false
    },
    password: {
        type: String,
        unique: false,
        required: true
    }
}, { collection: 'User', versionKey: false })

const User = mongoose.model('User', UserSchema)

module.exports = User
