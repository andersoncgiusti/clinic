const express = require('express')
const router = express.Router()

const cashController = require('../controllers/cash.controller')

router.get('/api/cash' , cashController.cashGet)
router.get('/api/cash/:id', cashController.cashGetId)
router.post('/api/cash', cashController.cashPost)
router.put('/api/cash/:id', cashController.cashPatchId)
router.delete('/api/cash/:id', cashController.cashDeleteId)

module.exports = router