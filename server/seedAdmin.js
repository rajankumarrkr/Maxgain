require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to Database');

        const mobile = 'svcet';
        const password = 'svcet@123';

        let user = await User.findOne({ mobile });

        if (user) {
            console.log('Admin user already exists. Updating password and admin status...');
            user.password = password; // The pre-save hook will hash it
            user.isAdmin = true;
            await user.save();
            console.log('Admin user updated successfully!');
        } else {
            console.log('Creating new admin user...');
            const newReferralCode = 'ADMIN' + Math.random().toString(36).substring(2, 6).toUpperCase();
            user = await User.create({
                name: 'Super Admin',
                mobile: mobile,
                password: password,
                referralCode: newReferralCode,
                isAdmin: true
            });
            console.log('Admin user created successfully!');
        }

        console.log(`\n✅ You can now log in at http://localhost:5173/admin-login`);
        console.log(`ID: ${mobile}`);
        console.log(`Password: ${password}\n`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

seedAdmin();
