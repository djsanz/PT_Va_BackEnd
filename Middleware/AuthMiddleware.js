const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).send({ verifyToken: 'Failed to authenticate token.' })
            }
            return next()
        })
    } else {
        return res.status(401).send({ verifyToken: 'No se ha enviado el token.' })
    }
}

function GetTokenAccount (req) {
    try {
        const Decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JwtSecret)
        return Decoded.user._id
    } catch (err) {
        return null
    }
}

module.exports = {
    verifyToken,
    GetTokenAccount
}
