const express = require('express');
const router = express.Router();

const sessionsController = require('../controllers/sessions.controller');

router.post('/api/session' , sessionsController.sessionPost);
router.post('/api/session_post' , sessionsController.sessionPostTotal);
router.get('/api/session', sessionsController.sessionGet);
router.put('/api/session_totals/:id', sessionsController.sessionDelete);

router.put('/api/session', sessionsController.sessionPut);

router.put('/api/session_total', sessionsController.totalPut);

module.exports = router;