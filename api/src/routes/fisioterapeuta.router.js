const express = require('express')
const router = express.Router()

const fisioterapeutaController = require('../controllers/fisioterapeuta.controller')

router.get('/api/fisioterapeuta' , fisioterapeutaController.fisioterapeutaGet)
router.get('/api/fisioterapeuta/:id', fisioterapeutaController.fisioterapeutaGetId)
router.post('/api/fisioterapeuta', fisioterapeutaController.fisioterapeutaPost)
router.patch('/api/fisioterapeuta/:id', fisioterapeutaController.fisioterapeutaPatchId)
router.delete('/api/fisioterapeuta/:id', fisioterapeutaController.fisioterapeutaDeleteId)

module.exports = router