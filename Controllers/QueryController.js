const Query = require('../Models/query')

async function GetAll (req, res) {
    const Preguntas = await Query.find({})
    return res.json(Preguntas)
}

async function GetOne (req, res) {
    try {
        const Pregunta = await Query.findById(req.params.id)
        if (!Pregunta) return res.status(404).send('No existe la pregunta')
        return res.json(Pregunta)
    } catch {
        return res.status(500).send('Error')
    }
}

async function Create (req, res) {
    const Pregunta = new Query(req.body)
    try {
        const result = await Pregunta.save()
        return res.status(201).send(result)
    } catch {
        return res.status(500).send('Error')
    }
}

async function Update (req, res) {
    try {
        const Pregunta = await Query.findById(req.params.id)
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
        await Query.findByIdAndDelete(req.params.id)
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
