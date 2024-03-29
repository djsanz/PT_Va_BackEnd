const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')
const { verifyToken } = require('../Middleware/AuthMiddleware')

router.get('/GetAll', UserController.GetAll)
router.use(verifyToken)
router.get('/', UserController.GetUserMe)
router.get('/encuestas', UserController.GetEncuestasUser)
// router.post('/', UserController.Create)
// router.delete('/', UserController.Delete)

module.exports = router
