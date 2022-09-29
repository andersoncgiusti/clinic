const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.get('/api/userPacient', userController.userGetPacient)
router.get('/api/user', userController.userGet)
router.get('/api/user/:id', userController.userGetId)
router.post('/api/user', userController.userPost)
router.put('/api/user/:id', userController.userUpdateId)
router.put('/api/userChart/:id', userController.chartUpdateId)
router.delete('/api/user/:id', userController.userDeleteId)

module.exports = router