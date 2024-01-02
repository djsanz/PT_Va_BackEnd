const express = require('express')
const router = express.Router()
const LoginController = require('../Controllers/LoginController')
const RateLimiter = require('../Middleware/RateLimitMiddleware')

router.use(RateLimiter(1000, 4))
router.post('/', LoginController.Login)

module.exports = router
