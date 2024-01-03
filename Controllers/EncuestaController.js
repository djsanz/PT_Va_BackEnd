const EncuestaModel = require('../Models/encuesta')

async function GetAll (req, res) {
    const EncuestasAll = await EncuestaModel.find({}).populate('userId', { password: 0 }).populate('respuestas.queryId')
    return res.json(EncuestasAll)
}

async function GetOne (req, res) {
    try {
        const Encuesta = await EncuestaModel.findById(req.params.id, { 'respuestas._id': 0 }).populate('userId', { _id: 0, password: 0 }).populate('respuestas.queryId', { _id: 0 })
        if (!Encuesta) return res.status(404).send('No existe la encuesta')
        return res.json(Encuesta)
    } catch {
        return res.status(500).send('Error')
    }
}

async function Create (req, res) {
    const Pregunta = new EncuestaModel(req.body)
    try {
        const result = await Pregunta.save()
        return res.status(201).send(result)
    } catch {
        return res.status(500).send('Error')
    }
}

async function Update (req, res) {
    try {
        const Pregunta = await EncuestaModel.findById(req.params.id)
        if (!Pregunta) return res.status(404).send('No existe la pregunta')
        Pregunta.orden = req.body.orden
        Pregunta.pregunta = req.body.pregunta
        Pregunta.opciones = req.body.opciones
        await Pregunta.save()
        return res.json(Pregunta)
    } catch {
        return res.status(500).send('Error')
    }
}

async function Delete (req, res) {
    try {
        await EncuestaModel.findByIdAndDelete(req.params.id)
        return res.status(204).send()
    } catch {
        return res.status(404).send('No existe la pregunta')
    }
}

module.exports = {
    GetAll,
    GetOne,
    Create,
    Update,
    Delete
}
