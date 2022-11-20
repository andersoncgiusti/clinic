const express = require('express')
const router = express.Router()
// const authMiddleware = require('../middlewares/check-auth');

// router.use(authMiddleware);

const statusController = require('../controllers/status.controller')

router.get('/api/status' , statusController.status)

module.exports = router