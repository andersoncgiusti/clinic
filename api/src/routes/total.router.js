const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middlewares/check-auth');

// router.use(authMiddleware);

const totalController = require('../controllers/total.controller');

router.get('/api/total' , totalController.totalGet);
router.put('/api/total' , totalController.totalPost);
router.put('/api/totals' , totalController.totalPut);
// router.put('/api/totals' , totalController.totalForPut);

module.exports = router;