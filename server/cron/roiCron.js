const cron = require('node-cron');
const Investment = require('../models/Investment');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const dailyROICron = () => {
    // Run at 12:00 AM every day
    cron.schedule('0 0 * * *', async () => {
        console.log('Running Daily ROI Credit Job...');
        try {
            const activeInvestments = await Investment.find({ status: 'active' });
            for (const investment of activeInvestments) {
                const user = await User.findById(investment.user);
                if (user && !user.isBlocked) {
                    user.walletBalance += investment.dailyROI;
                    user.roiIncome += investment.dailyROI;
                    user.totalIncome += investment.dailyROI;
                    await user.save();

                    await Transaction.create({
                        user: user._id,
                        type: 'roi_credit',
                        amount: investment.dailyROI,
                        status: 'completed',
                        adminRemark: `Daily ROI for investment in ${investment.plan}`
                    });

                    investment.lastCreditDate = new Date();
                    if (new Date() >= investment.endDate) {
                        investment.status = 'completed';
                    }
                    await investment.save();
                }
            }
            console.log('Daily ROI Credit Job Completed.');
        } catch (error) {
            console.error('Error in Daily ROI Job:', error);
        }
    });
};

module.exports = dailyROICron;
