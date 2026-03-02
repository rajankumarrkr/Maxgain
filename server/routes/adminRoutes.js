const express = require('express');
const {
    getAllUsers,
    updateUserStatus,
    manualAdjustment,
    getPendingTransactions,
    approveTransaction
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect, admin);

router.get('/users', getAllUsers);
router.put('/user-status', updateUserStatus);
router.post('/manual-adjustment', manualAdjustment);
router.get('/pending-transactions', getPendingTransactions);
router.put('/approve-transaction', approveTransaction);

module.exports = router;
