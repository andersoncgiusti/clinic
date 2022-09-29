const express = require('express')
const router = express.Router()
// const authMiddleware = require('../middlewares/auth')

const prjectController = require('../controllers/project.controller')

// router.use(authMiddleware)

router.get('/api/project', prjectController.projectGet)
router.get('/api/project/:id', prjectController.projectGetId)
router.post('/api/project', prjectController.projectPost)
router.put('/api/project/:id', prjectController.projectPut)
router.delete('/api/project/:id', prjectController.projectDelete)

module.exports = router