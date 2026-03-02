const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, unique: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    walletBalance: { type: Number, default: 0 },
    totalIncome: { type: Number, default: 0 },
    rechargeIncome: { type: Number, default: 0 },
    referralIncome: { type: Number, default: 0 },
    roiIncome: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    bankDetails: {
        name: String,
        accountNo: String,
        ifsc: String
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
