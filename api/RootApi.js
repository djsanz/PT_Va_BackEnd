const express = require('express')
const router = express.Router()
const RootController = require('../Controllers/RootController')
const RateLimiter = require('../Middleware/RateLimitMiddleware')

router.use(RateLimiter(1000, 4))
router.get('/', RootController.Root) // Muestra la página de inicio
router.get('/ping', RootController.Ping) // devuelve pong para comprobar que el servidor está activo
router.get('/favicon.ico', RootController.FavIcon) // devuelve el favicon.ico

module.exports = router
