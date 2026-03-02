const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['recharge', 'withdrawal', 'referral_commission', 'roi_credit', 'manual_adjustment'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },
    utr: { type: String }, // For recharge
    bankDetails: { // For withdrawal
        name: String,
        accountNo: String,
        ifsc: String
    },
    adminRemark: { type: String }
}, { timestamps: true });

// Add database indexes for performance optimization
transactionSchema.index({ user: 1, type: 1 });
transactionSchema.index({ status: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
