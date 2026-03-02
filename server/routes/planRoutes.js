const express = require('express');
const { getPlans, investInPlan } = require('../controllers/planController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getPlans);
router.post('/invest', protect, investInPlan);

module.exports = router;
