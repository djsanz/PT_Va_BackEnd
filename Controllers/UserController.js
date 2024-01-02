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
    if (req.body.password !== 'GetAllUsers') return res.status(401).send('Unauthorized')
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
    await User.deleteMany({})
    const user1 = new User({
        dorsal: '1',
        nombre: 'Jordi Masip',
        posicion: 'Portero',
        password: await Funciones.Encrypt('1234')
    })
    const user2 = new User({
        dorsal: '25',
        nombre: 'John',
        posicion: 'Portero',
        password: await Funciones.Encrypt('1234')
    })
    const user3 = new User({
        dorsal: '2',
        nombre: 'Luis Pérez',
        posicion: 'Defensa',
        password: await Funciones.Encrypt('1234')
    })
    const user4 = new User({
        dorsal: '4',
        nombre: 'Víctor Meseguer',
        posicion: 'Centrocampista',
        password: await Funciones.Encrypt('1234')
    })
    const user5 = new User({
        dorsal: '7',
        nombre: 'Sylla',
        posicion: 'Delantero',
        password: await Funciones.Encrypt('1234')
    })
    await user1.save()
    await user2.save()
    await user3.save()
    await user4.save()
    await user5.save()
    res.status(200).send('Migracion completa OK')
}

module.exports = {
    GetUserMe,
    GetAll,
    Create,
    Delete,
    MigrateDB
}
