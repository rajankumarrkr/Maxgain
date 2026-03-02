import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Smartphone, Lock, Share2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        password: '',
        referralCode: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary items-center justify-center p-6 relative overflow-hidden py-20">
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -top-20 right-0 w-80 h-80 bg-accent rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-accent to-blue-400 rounded-2xl shadow-2xl mb-4"
                    >
                        <TrendingUp className="text-slate-800" size={30} />
                    </motion.div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-800 mb-2 uppercase">
                        Join <span className="text-accent">MaxGain</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Start your passive income journey today</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-6 md:p-8 border border-black/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Full Identity</label>
                            <div className="flex items-center gap-4 bg-black/5 p-3.5 rounded-2xl border border-black/5 focus-within:border-accent group transition-all">
                                <User className="text-slate-500 group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Full Name"
                                    className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-600 font-medium text-sm"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Mobile Connection</label>
                            <div className="flex items-center gap-4 bg-black/5 p-3.5 rounded-2xl border border-black/5 focus-within:border-accent group transition-all">
                                <Smartphone className="text-slate-500 group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-600 font-medium text-sm"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Security Pass</label>
                            <div className="flex items-center gap-4 bg-black/5 p-3.5 rounded-2xl border border-black/5 focus-within:border-accent group transition-all">
                                <Lock className="text-slate-500 group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create Password"
                                    className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-600 font-medium text-sm"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Referral Link (Optional)</label>
                            <div className="flex items-center gap-4 bg-black/5 p-3.5 rounded-2xl border border-black/5 focus-within:border-accent group transition-all">
                                <Share2 className="text-slate-500 group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="referralCode"
                                    placeholder="Referral Code"
                                    className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-600 font-medium text-sm"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-xs text-center font-medium bg-red-400/10 py-2 rounded-lg"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button type="submit" className="premium-btn py-3.5 text-md tracking-widest font-black uppercase flex items-center justify-center gap-3 mt-4">
                            <UserPlus size={20} />
                            Register
                        </button>
                    </form>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-8 text-slate-500 font-medium"
                >
                    Already invested? <Link to="/login" className="text-accent underline hover:text-slate-800 transition-colors">Login Here</Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Register;
