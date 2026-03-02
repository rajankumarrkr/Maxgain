const Plan = require('../models/Plan');
const Investment = require('../models/Investment');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find({ isActive: true });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const investInPlan = async (req, res) => {
    const { planId } = req.body;
    try {
        const plan = await Plan.findById(planId);
        const user = await User.findById(req.user._id);

        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        if (user.walletBalance < plan.price) {
            return res.status(400).json({ message: 'Insufficient wallet balance' });
        }

        // Deduct balance
        user.walletBalance -= plan.price;
        await user.save();

        // Create Investment
        const investment = await Investment.create({
            user: user._id,
            plan: plan._id,
            amount: plan.price,
            dailyROI: plan.dailyROI,
            endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000)
        });

        // Referral Commission (10% of deposit/investment amount)
        if (user.referredBy) {
            const referrer = await User.findById(user.referredBy);
            if (referrer) {
                const commission = plan.price * 0.10;
                referrer.walletBalance += commission;
                referrer.referralIncome += commission;
                referrer.totalIncome += commission;
                await referrer.save();

                await Transaction.create({
                    user: referrer._id,
                    type: 'referral_commission',
                    amount: commission,
                    status: 'completed',
                    adminRemark: `Commission from ${user.name}'s investment`
                });
            }
        }

        res.status(201).json(investment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPlans, investInPlan };
