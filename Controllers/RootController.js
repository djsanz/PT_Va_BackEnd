async function Root (req, res) {
    res.send()
}

async function Ping (req, res) {
    res.json({ data: 'pong' })
}

async function FavIcon (req, res) {
    const path = require('path')
    res.sendFile(path.join(__dirname, '../Views/Assets/favicon.ico'))
}

async function MigrateDB (req, res) {
    if (req.body.password !== 'MigraDB') return res.status(401).send('Unauthorized')
    const Funciones = require('../helper/funciones')
    const User = require('../Models/user')
    const Query = require('../Models/query')
    const Encuesta = require('../Models/encuesta')
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
        // Cargo Preguntas
        if (jsonData.query.length < 1) return res.status(500).send('Error, no hay preguntas en MigrateDB.json')
        await Query.deleteMany({})
        for (const pregunta of jsonData.query) {
            const query = new Query(pregunta)
            await query.save()
        }
        // Cargo Encuestas
        const ListaUsuarios = await User.find({}, { password: 0 })
        const ListaPreguntas = await Query.find({})
        await Encuesta.deleteMany({})
        for (let i = 1; i < 15; i++) {
            const fecha = new Date()
            fecha.setDate(fecha.getDate() - i)
            for (const Usuario of ListaUsuarios) {
                if (Usuario.dorsal === 0) continue
                const EncuestaTemp = {
                    fecha,
                    userId: Usuario._id,
                    respuestas: []
                }
                for (const Pregunta of ListaPreguntas) {
                    EncuestaTemp.respuestas.push({
                        queryId: Pregunta._id,
                        respuesta: Funciones.getRandomInt(0, Pregunta.opciones.length - 1)
                    })
                }
                const encuesta = new Encuesta(EncuestaTemp)
                await encuesta.save()
            }
        }

        res.status(200).send('Migracion completa OK')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    Root,
    Ping,
    FavIcon,
    MigrateDB
}
