const express = require('express');
const router = express.Router();

const sessionsController = require('../controllers/sessions.controller');

router.post('/api/session' , sessionsController.sessionPost);
router.get('/api/session', sessionsController.sessionGet);
router.delete('/api/session/:id', sessionsController.sessionDelete);
router.put('/api/session/:id', sessionsController.sessionPut);

module.exports = router;