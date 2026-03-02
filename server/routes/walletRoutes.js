const express = require('express');
const { recharge, withdraw, getTransactions, updateBankDetails } = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/recharge', protect, recharge);
router.post('/withdraw', protect, withdraw);
router.get('/history', protect, getTransactions);
router.put('/bank-details', protect, updateBankDetails);

module.exports = router;
