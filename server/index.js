const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const dailyROICron = require('./cron/roiCron');

// Load env variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ===========================
   ROOT & HEALTH ROUTES
=========================== */

// Root route (for browser testing)
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "MaxGain Backend Running 🚀"
    });
});

// Health check route (recommended for production)
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

/* ===========================
   API ROUTES
=========================== */

const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');
const planRoutes = require('./routes/planRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/admin', adminRoutes);

/* ===========================
   TEAM ROUTE
=========================== */

const User = require('./models/User');
const { protect } = require('./middleware/authMiddleware');

app.get('/api/team', protect, async (req, res) => {
    try {
        const team = await User.find({ referredBy: req.user._id })
            .select('name mobile totalIncome walletBalance createdAt');

        res.json({
            teamSize: team.length,
            teamMembers: team
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ===========================
   CRON JOB
=========================== */

dailyROICron();

/* ===========================
   SERVER START
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});