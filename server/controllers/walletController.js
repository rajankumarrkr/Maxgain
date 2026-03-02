const Transaction = require('../models/Transaction');
const User = require('../models/User');

const recharge = async (req, res) => {
    const { amount, utr } = req.body;
    if (amount < 300) {
        return res.status(400).json({ message: 'Minimum recharge is ₹300' });
    }
    try {
        const transaction = await Transaction.create({
            user: req.user._id,
            type: 'recharge',
            amount,
            utr,
            status: 'pending'
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const withdraw = async (req, res) => {
    const { amount } = req.body;
    const user = await User.findById(req.user._id);

    if (amount < 300) {
        return res.status(400).json({ message: 'Minimum withdrawal is ₹300' });
    }
    if (user.walletBalance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
    }
    if (!user.bankDetails || !user.bankDetails.accountNo) {
        return res.status(400).json({ message: 'Please add bank details first' });
    }

    try {
        // Amount after 15% GST is handled in UI display, but we deduct full amount from wallet
        const transaction = await Transaction.create({
            user: req.user._id,
            type: 'withdrawal',
            amount,
            status: 'pending',
            bankDetails: user.bankDetails
        });

        user.walletBalance -= amount;
        await user.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBankDetails = async (req, res) => {
    const { name, accountNo, ifsc } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.bankDetails = { name, accountNo, ifsc };
            await user.save();
            res.json({ message: 'Bank details updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { recharge, withdraw, getTransactions, updateBankDetails };
