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

async function GetAll (req, res) {
    const AllUsers = await User.find({}, { password: 0 })
    return res.send(AllUsers)
}

async function Create (req, res) {
    const user = new User(req.body)
    user.password = await Funciones.Encrypt(req.body.password)
    try {
        const result = await user.save({}, { password: 0 })
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

module.exports = {
    GetUserMe,
    GetAll,
    Create,
    Delete
}
