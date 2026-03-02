require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const makeAdmin = async () => {
    const mobile = process.argv[2];

    if (!mobile) {
        console.error('Please provide a mobile number. Example: node makeAdmin.js 9876543210');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to Database');

        const user = await User.findOne({ mobile });

        if (!user) {
            console.error(`User with mobile ${mobile} not found.`);
            process.exit(1);
        }

        user.isAdmin = true;
        await user.save();

        console.log(`\n✅ SUCCESS: User ${user.name} (${mobile}) is now an ADMIN!`);
        console.log(`You can now log in at http://localhost:5173/admin-login using this mobile number and your regular password.\n`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

makeAdmin();
