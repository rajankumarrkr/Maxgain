import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Info } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/auth/profile');
                setProfile(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm text-slate-400">Welcome,</h2>
                    <h1 className="text-xl font-bold">{profile?.name}</h1>
                </div>
                <div className="bg-accent/20 p-2 rounded-full">
                    <Wallet className="text-accent" size={24} />
                </div>
            </div>

            {/* Wallet Card */}
            <div className="premium-gradient p-6 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col gap-4 border border-white/10">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Wallet size={100} />
                </div>
                <div className="z-10">
                    <p className="text-slate-300 text-sm font-medium">Total Wallet Balance</p>
                    <h2 className="text-4xl font-bold mt-1 gold-text">₹{profile?.walletBalance.toLocaleString()}</h2>
                </div>
                <div className="flex gap-4 z-10 mt-2">
                    <button
                        onClick={() => navigate('/recharge')}
                        className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-2xl flex items-center justify-center gap-2 backdrop-blur-md border border-white/5 transition-all"
                    >
                        <ArrowUpCircle size={20} className="text-green-400" />
                        <span className="font-semibold">Recharge</span>
                    </button>
                    <button
                        onClick={() => navigate('/withdraw')}
                        className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-2xl flex items-center justify-center gap-2 backdrop-blur-md border border-white/5 transition-all"
                    >
                        <ArrowDownCircle size={20} className="text-red-400" />
                        <span className="font-semibold">Withdraw</span>
                    </button>
                </div>
            </div>

            {/* Banners (Static Demonstration) */}
            <div className="grid grid-cols-1 gap-4">
                <div className="glass-card flex items-center gap-4 bg-gradient-to-r from-blue-900/40 to-transparent">
                    <div className="bg-accent/20 p-3 rounded-2xl">
                        <Info className="text-accent" />
                    </div>
                    <div>
                        <h3 className="font-bold">Alpha Trading Bots</h3>
                        <p className="text-xs text-slate-400">Generating 10% daily returns consistently.</p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card flex flex-col gap-1">
                    <p className="text-xs text-slate-400">Total Income</p>
                    <p className="font-bold text-lg">₹{profile?.totalIncome.toLocaleString()}</p>
                </div>
                <div className="glass-card flex flex-col gap-1">
                    <p className="text-xs text-slate-400">Referral Code</p>
                    <p className="font-bold text-accent">{profile?.referralCode}</p>
                </div>
            </div>

            {/* Trading Banner Illustration Space */}
            <div className="h-48 rounded-3xl overflow-hidden glass-card flex items-center justify-center border-dashed border-2 border-white/10">
                <div className="text-center p-6">
                    <p className="text-slate-500 italic">"Our expert traders utilize high-frequency algorithms to ensure your stable returns."</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
