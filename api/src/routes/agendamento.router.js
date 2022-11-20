const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middlewares/check-auth');

// router.use(authMiddleware);

const agendamentoController = require('../controllers/agendamento.controller');

router.get('/api/agendamento', agendamentoController.agendamentoGet);
router.get('/api/agendamento/:id', agendamentoController.agendamentoGetId);
router.post('/api/agendamento', agendamentoController.agendamentoPost);
router.put('/api/agendamento/:id', agendamentoController.agendamentoUpdateId);
router.put('/api/agendamento_finish/:id', agendamentoController.agendamentoUpdateIdFinish);
router.delete('/api/agendamento/:id', agendamentoController.agendamentoDeleteId);

module.exports = router;