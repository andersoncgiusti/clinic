const express = require('express');
const router = express.Router();

const totalController = require('../controllers/total.controller');

router.post('/api/total' , totalController.totalPost);

module.exports = router;