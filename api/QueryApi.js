const express = require('express')
const router = express.Router()
const QueryController = require('../Controllers/QueryController')

router.post('/', QueryController.Create) // Create Query
router.get('/', QueryController.GetAll) // Read All Query
router.get('/:id', QueryController.GetOne) // Read One Query
router.put('/:id', QueryController.Update) // Update Query
router.delete('/:id', QueryController.Delete) // Delete Query

module.exports = router
