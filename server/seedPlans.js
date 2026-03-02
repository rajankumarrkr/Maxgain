const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plan = require('./models/Plan');

dotenv.config();

const plans = [
    { name: 'Plan 1', price: 999, dailyROI: 100, duration: 99 },
    { name: 'Plan 2', price: 2500, dailyROI: 300, duration: 99 },
    { name: 'Plan 3', price: 5000, dailyROI: 800, duration: 99 },
    { name: 'Plan 4', price: 8000, dailyROI: 2000, duration: 99 },
    { name: 'Plan 5', price: 12000, dailyROI: 3600, duration: 99 },
    { name: 'Plan 6', price: 20000, dailyROI: 8000, duration: 99 },
    { name: 'Plan 7', price: 30000, dailyROI: 15000, duration: 99 },
    { name: 'Plan 8', price: 50000, dailyROI: 35000, duration: 99 },
];

const seedPlans = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Plan.deleteMany();
        await Plan.insertMany(plans);
        console.log('Plans Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding plans:', error);
        process.exit(1);
    }
};

seedPlans();
