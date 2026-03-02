import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import {
    User,
    CreditCard,
    History,
    MessageCircle,
    LogOut,
    ChevronRight,
    DollarSign,
    Shield
} from 'lucide-react';

const Profile = () => {
    const { logout } = useAuth();
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

    const menuItems = [
        { name: 'Income Record', icon: <DollarSign className="text-green-400" />, path: '/income-record' },
        { name: 'Withdrawal Record', icon: <History className="text-red-400" />, path: '/withdrawals' },
        { name: 'Bank Details', icon: <CreditCard className="text-blue-400" />, path: '/bank-details' },
        { name: 'Telegram Support', icon: <MessageCircle className="text-sky-400" />, path: 'https://t.me/support', external: true },
        profile?.isAdmin ? { name: 'Admin Dashboard', icon: <Shield className="text-gold" />, path: '/admin' } : null
    ].filter(Boolean);

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="flex flex-col gap-6 pb-10">
            {/* Profile Header */}
            <div className="relative pt-10 px-4 pb-6 glass-card mt-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-20 premium-gradient opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center -mt-12 shadow-2xl overflow-hidden">
                        <User size={60} className="text-slate-600" />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-xl font-bold">{profile?.name}</h2>
                        <p className="text-slate-400 text-sm">{profile?.mobile}</p>
                        <p className="mt-2 text-xs bg-accent/20 text-accent px-3 py-1 rounded-full inline-block font-bold">
                            UID: MG-{profile?._id.substring(18).toUpperCase()}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-8 text-center pt-6 border-t border-white/5">
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Balance</p>
                        <p className="font-bold text-accent">₹{profile?.walletBalance}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">ROI Income</p>
                        <p className="font-bold text-gold">₹{profile?.roiIncome || 0}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total Income</p>
                        <p className="font-bold text-green-400">₹{profile?.totalIncome}</p>
                    </div>
                </div>
            </div>

            {/* Menu List */}
            <div className="flex flex-col gap-2">
                {menuItems.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => item.external ? window.open(item.path, '_blank') : null}
                        className="glass-card flex items-center justify-between hover:bg-white/10 transition-all border border-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-white/5 p-2 rounded-xl">
                                {item.icon}
                            </div>
                            <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronRight size={20} className="text-slate-600" />
                    </button>
                ))}
            </div>

            {/* Logout Button */}
            <button
                onClick={logout}
                className="mt-6 flex items-center justify-center gap-2 text-red-400 font-bold py-4 rounded-2xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-all active:scale-95"
            >
                <LogOut size={20} />
                LOGOUT SESSION
            </button>
        </div>
    );
};

export default Profile;
