const Funciones = require('../helper/funciones')
const User = require('../Models/user')
const { GetTokenAccount } = require('../Middleware/AuthMiddleware')

async function GetUserMe (req, res) {
    const id = GetTokenAccount(req)
    if (!id) return res.status(401).send('Unauthorized')
    try {
        const result = await User.findOne({ _id: id }, { password: 0 })
        res.status(200).send(result)
    } catch {
        res.status(500).send('Error')
    }
}

function GetAll (req, res) {
    User.find({}, { password: 0 })
        .then(data => { res.send(data) })
        .catch(err => { res.send(err) })
}

async function Create (req, res) {
    const user = new User(req.body)
    user.password = await Funciones.Encrypt(req.body.password)
    try {
        const result = await user.save()
        res.status(201).send(result)
    } catch {
        res.status(500).send('Error')
    }
}

async function Delete (req, res) {
    try {
        const result = await User.deleteOne({ _id: req.body.id })
        res.status(200).send(result)
    } catch {
        res.status(500).send('Error')
    }
}

async function MigrateDB (req, res) {
    if (req.body.password !== 'MigraDB') return res.status(401).send('Unauthorized')
    try {
        const fs = require('fs')
        const FileData = fs.readFileSync('./helper/MigrateDB.json', 'utf8')
        const jsonData = JSON.parse(FileData)
        // Cargo Jugadores
        if (jsonData.jugadores.length < 1) return res.status(500).send('Error, no hay jugadores en MigrateDB.json')
        await User.deleteMany({})
        for (const jugador of jsonData.jugadores) {
            const user = new User(jugador)
            user.password = await Funciones.Encrypt(jugador.password)
            await user.save()
        }
        res.status(200).send('Migracion completa OK')
    } catch {
        res.status(500).send('Error, fallo al leer fichero MigrateDB.json')
    }
}

module.exports = {
    GetUserMe,
    GetAll,
    Create,
    Delete,
    MigrateDB
}
