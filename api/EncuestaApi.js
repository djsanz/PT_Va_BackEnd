const express = require('express')
const router = express.Router()
const EncuestaController = require('../Controllers/EncuestaController')
const { verifyToken } = require('../Middleware/AuthMiddleware')

router.get('/', EncuestaController.GetAll)
router.use(verifyToken)
router.get('/:id', EncuestaController.GetOne)
router.post('/', EncuestaController.Create)
router.put('/:id', EncuestaController.Update)
router.delete('/:id', EncuestaController.Delete)

module.exports = router
