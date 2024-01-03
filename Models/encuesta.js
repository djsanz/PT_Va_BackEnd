const mongoose = require('mongoose')

const EncuestaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false,
        ref: 'User',
        required: true
    },
    respuestas: [{
        queryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Query',
            required: true
        },
        respuesta: {
            type: Number,
            required: true
        }
    }]
}, { collection: 'Encuesta', versionKey: false })

const Encuesta = mongoose.model('Encuesta', EncuestaSchema)

module.exports = Encuesta
