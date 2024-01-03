function Encrypt (Cadena) {
    const bcrypt = require('bcrypt')
    return new Promise((resolve, reject) => {
        bcrypt.hash(Cadena, 10, (err, hash) => {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })
    })
}

function ComparePassword (Cadena, hash) {
    const bcrypt = require('bcrypt')
    return new Promise((resolve, reject) => {
        bcrypt.compare(Cadena, hash, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

function getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
    Encrypt,
    ComparePassword,
    getRandomInt
}
