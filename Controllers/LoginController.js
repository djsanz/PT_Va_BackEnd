const Funciones = require('../helper/funciones')
const User = require('../Models/user')
const jwt = require('jsonwebtoken')

async function Login (req, res) {
    const Dorsal = req.body.dorsal
    const Password = req.body.password
    const user = await User.findOne({ dorsal: Dorsal })
    if (!user) return (process.env.VERCEL_ENV !== 'production') ? res.status(401).send('Unauthorized: User not found') : res.status(401).send('Unauthorized')
    const validPassword = await Funciones.ComparePassword(Password, user.password)
    if (!validPassword) return (process.env.VERCEL_ENV !== 'production') ? res.status(401).send('Unauthorized: Password incorrect') : res.status(401).send('Unauthorized')
    const token = jwt.sign({ user }, process.env.JwtSecret, { expiresIn: '1h' })
    res.status(200).json({ token, user })
}

module.exports = {
    Login
}
