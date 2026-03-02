const User = require('../models/User');
const Transaction = require('../models/Transaction');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserStatus = async (req, res) => {
    const { userId, isBlocked } = req.body;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.isBlocked = isBlocked;
            await user.save();
            res.json({ message: `User ${isBlocked ? 'blocked' : 'unblocked'}` });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const manualAdjustment = async (req, res) => {
    const { userId, amount, type } = req.body; // type: 'add' or 'remove'
    try {
        const user = await User.findById(userId);
        if (user) {
            if (type === 'add') {
                user.walletBalance += amount;
            } else {
                user.walletBalance -= amount;
            }
            await user.save();
            await Transaction.create({
                user: userId,
                type: 'manual_adjustment',
                amount: type === 'add' ? amount : -amount,
                status: 'completed',
                adminRemark: 'Admin Manual Adjustment'
            });
            res.json({ message: 'Balance adjusted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPendingTransactions = async (req, res) => {
    const { type } = req.query; // 'recharge' or 'withdrawal'
    try {
        const transactions = await Transaction.find({ type, status: 'pending' }).populate('user', 'name mobile');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const approveTransaction = async (req, res) => {
    const { transactionId, status, remark } = req.body; // status: 'approved' or 'rejected'
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        if (transaction.status !== 'pending') return res.status(400).json({ message: 'Transaction already processed' });

        transaction.status = status;
        transaction.adminRemark = remark;

        if (status === 'approved' && transaction.type === 'recharge') {
            const user = await User.findById(transaction.user);
            user.walletBalance += transaction.amount;
            user.rechargeIncome += transaction.amount; // track total recharge
            await user.save();
        } else if (status === 'rejected' && transaction.type === 'withdrawal') {
            // Refund to wallet if withdrawal rejected
            const user = await User.findById(transaction.user);
            user.walletBalance += transaction.amount;
            await user.save();
        }

        await transaction.save();
        res.json({ message: `Transaction ${status}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllUsers, updateUserStatus, manualAdjustment, getPendingTransactions, approveTransaction };
