const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const dailyROICron = require('./cron/roiCron');

// Route imports
const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');
const planRoutes = require('./routes/planRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/admin', adminRoutes);

// Referral Tree/Team Stats (Directly here for simplicity)
const User = require('./models/User');
const { protect } = require('./middleware/authMiddleware');
app.get('/api/team', protect, async (req, res) => {
    try {
        const team = await User.find({ referredBy: req.user._id }).select('name mobile totalIncome walletBalance createdAt');
        res.json({
            teamSize: team.length,
            teamMembers: team
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Initialize Cron Job
dailyROICron();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
