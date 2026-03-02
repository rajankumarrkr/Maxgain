const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { name, mobile, password, referralCode } = req.body;

    try {
        const userExists = await User.findOne({ mobile });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let referredBy = null;
        if (referralCode) {
            const referrer = await User.findOne({ referralCode });
            if (referrer) {
                referredBy = referrer._id;
            }
        }

        // Generate unique referral code for the new user
        const newReferralCode = 'MG' + Math.random().toString(36).substring(2, 8).toUpperCase();

        const user = await User.create({
            name,
            mobile,
            password,
            referredBy,
            referralCode: newReferralCode
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { mobile, password } = req.body;

    try {
        const user = await User.findOne({ mobile });
        if (user && (await user.comparePassword(password))) {
            if (user.isBlocked) {
                return res.status(401).json({ message: 'User is blocked' });
            }
            res.json({
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid mobile or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            mobile: user.mobile,
            walletBalance: user.walletBalance,
            totalIncome: user.totalIncome,
            referralCode: user.referralCode,
            isAdmin: user.isAdmin,
            bankDetails: user.bankDetails
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
