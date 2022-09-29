const express = require('express')
const router = express.Router()
// const authMiddleware = require('../middlewares/auth')

const statusController = require('../controllers/status.controller')

// router.use(authMiddleware)

router.get('/api/status' , statusController.status)

module.exports = router