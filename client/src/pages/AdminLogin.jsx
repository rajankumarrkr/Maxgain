import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Smartphone, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(mobile, password);
            if (userData && userData.isAdmin) {
                navigate('/admin');
            } else {
                setError('Unauthorized. Admin access required.');
                // Optionally log them out if they are not an admin
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-900 items-center justify-center p-6 relative overflow-hidden">
            {/* Special Dark Admin Aesthetic */}
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
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-red-500 to-orange-500 rounded-3xl shadow-2xl mb-6 shadow-red-500/20"
                    >
                        <Shield className="text-white" size={40} />
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">
                        Admin<span className="text-red-500">Portal</span>
                    </h1>
                    <p className="text-slate-400 font-medium">Restricted System Access</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-800/80 p-8 border border-white/10 backdrop-blur-2xl shadow-2xl relative rounded-2xl overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent flex"></div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Admin ID (Mobile)</label>
                            <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5 focus-within:border-red-500 transition-all">
                                <Smartphone className="text-slate-500" size={22} />
                                <input
                                    type="text"
                                    placeholder="Enter admin mobile number"
                                    className="bg-transparent border-none outline-none w-full text-white placeholder:text-slate-600 font-medium"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Admin Security Key</label>
                            <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5 focus-within:border-red-500 transition-all">
                                <Lock className="text-slate-500" size={22} />
                                <input
                                    type="password"
                                    placeholder="Enter precision password"
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
                                className="text-red-400 text-sm text-center font-bold py-2 bg-red-500/10 border border-red-500/20 rounded-lg"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button type="submit" className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/30 py-4 rounded-xl text-lg tracking-widest font-black uppercase flex items-center justify-center gap-3 transition-all active:scale-95">
                            <Shield size={22} />
                            Authenticate
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
