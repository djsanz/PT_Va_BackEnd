const mongoose = require('mongoose')

const QuerySchema = new mongoose.Schema({
    orden: {
        type: Number,
        unique: true,
        required: true
    },
    pregunta: {
        type: String,
        unique: true,
        required: true
    },
    opciones: {
        type: Object,
        unique: false,
        required: true
    }
}, { collection: 'Query', versionKey: false })

const Query = mongoose.model('Query', QuerySchema)

module.exports = Query
