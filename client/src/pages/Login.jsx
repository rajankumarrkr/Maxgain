import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Smartphone, Lock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(mobile, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-80 h-80 bg-accent rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] pointer-events-none"
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
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-accent to-blue-400 rounded-3xl shadow-2xl mb-6 transform rotate-12"
                    >
                        <TrendingUp className="text-white" size={40} />
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">
                        Max<span className="text-accent">Gain</span>
                    </h1>
                    <p className="text-slate-400 font-medium">Elevate your wealth with fixed returns</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-8 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Mobile Access</label>
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-accent group transition-all">
                                <Smartphone className="text-slate-500 group-focus-within:text-accent transition-colors" size={22} />
                                <input
                                    type="text"
                                    placeholder="Enter mobile number"
                                    className="bg-transparent border-none outline-none w-full text-white placeholder:text-slate-600 font-medium"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Secure Key</label>
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-accent group transition-all">
                                <Lock className="text-slate-500 group-focus-within:text-accent transition-colors" size={22} />
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className="bg-transparent border-none outline-none w-full text-white placeholder:text-slate-600 font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-400 text-sm text-center font-medium py-2 bg-red-400/10 rounded-lg"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button type="submit" className="premium-btn py-4 text-lg tracking-widest font-black uppercase flex items-center justify-center gap-3">
                            <LogIn size={22} />
                            Authorize
                        </button>
                    </form>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-8 text-slate-500 font-medium"
                >
                    New investor? <Link to="/register" className="text-accent underline hover:text-white transition-colors">Create Account</Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
