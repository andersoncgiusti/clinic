const express = require('express');
const router = express.Router();

const sessionsController = require('../controllers/sessions.controller');

router.post('/api/session' , sessionsController.sessionPost);
router.get('/api/session', sessionsController.sessionGet);

module.exports = router