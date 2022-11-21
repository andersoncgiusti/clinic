const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const prontuarioController = require('../controllers/prontuarios.controller');

router.get('/api/prontuario', prontuarioController.prontuarioGet);
router.get('/api/prontuario/:id', prontuarioController.prontuarioGetId);
router.post('/api/prontuario', prontuarioController.prontuarioPost);
router.patch('/api/prontuario/:id', prontuarioController.prontuarioPatchId);
router.delete('/api/prontuario/:id', prontuarioController.prontuarioDeleteId);

module.exports = router;