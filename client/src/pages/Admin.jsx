import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Users, CreditCard, Shield, Check, X, Ban, PlusCircle, LogOut } from 'lucide-react';

const Admin = () => {
    const { user, loading: authLoading, logout } = useAuth();
    const navigate = useNavigate();
    const [tab, setTab] = useState('recharges'); // recharges, withdrawals, users
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                navigate('/admin-login');
            } else if (!user.isAdmin) {
                logout();
                navigate('/admin-login');
            }
        }
    }, [user, authLoading, navigate, logout]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (tab === 'recharges') {
                const { data } = await api.get('/admin/pending-transactions?type=recharge');
                setData(data);
            } else if (tab === 'withdrawals') {
                const { data } = await api.get('/admin/pending-transactions?type=withdrawal');
                setData(data);
            } else if (tab === 'users') {
                const { data } = await api.get('/admin/users');
                setData(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tab]);

    const handleAction = async (transactionId, status) => {
        try {
            await api.put('/admin/approve-transaction', { transactionId, status, remark: 'Processed by Admin' });
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Action failed');
        }
    };

    const toggleBlock = async (userId, currentStatus) => {
        try {
            await api.put('/admin/user-status', { userId, isBlocked: !currentStatus });
            fetchData();
        } catch (err) {
            alert('Action failed');
        }
    };

    const addManualBalance = async (userId) => {
        const amount = prompt('Enter amount to add:');
        if (!amount || isNaN(amount)) return;
        try {
            await api.post('/admin/manual-adjustment', { userId, amount: Number(amount), type: 'add' });
            fetchData();
        } catch (err) {
            alert('Action failed');
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen bg-slate-50">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Admin<span className="text-red-500">Portal</span></h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-600 hidden md:inline-block">Logged in as Admin</span>
                    <button
                        onClick={() => {
                            logout();
                            navigate('/admin-login');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-bold text-sm transition-colors"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                <button
                    onClick={() => setTab('recharges')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'recharges' ? 'bg-accent text-slate-800 shadow-lg shadow-accent/20' : 'text-slate-500'}`}
                >
                    RECHARGES
                </button>
                <button
                    onClick={() => setTab('withdrawals')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'withdrawals' ? 'bg-accent text-slate-800 shadow-lg shadow-accent/20' : 'text-slate-500'}`}
                >
                    WITHDRAWALS
                </button>
                <button
                    onClick={() => setTab('users')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'users' ? 'bg-accent text-slate-800 shadow-lg shadow-accent/20' : 'text-slate-500'}`}
                >
                    USERS
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                    <div className="text-center py-20 text-slate-500 italic text-sm">Loading data...</div>
                ) : data.length === 0 ? (
                    <div className="text-center py-20 text-slate-600 italic text-sm">No pending items found.</div>
                ) : (
                    data.map((item, idx) => (
                        <div key={idx} className="glass-card flex flex-col gap-4 border border-black/10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-slate-800 uppercase text-xs tracking-wider">{item.user?.name || item.name}</p>
                                    <p className="text-slate-500 text-[10px] font-mono">{item.user?.mobile || item.mobile}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-accent font-black text-lg">₹{item.amount || item.walletBalance}</p>
                                    {tab === 'users' && <p className="text-[10px] text-slate-600">Balance</p>}
                                </div>
                            </div>

                            {tab === 'recharges' && (
                                <div className="bg-black/5 p-2 rounded-lg border border-black/5 flex justify-between items-center">
                                    <span className="text-[10px] text-slate-500">UTR: <span className="text-slate-800 font-mono">{item.utr}</span></span>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAction(item._id, 'approved')} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"><Check size={16} /></button>
                                        <button onClick={() => handleAction(item._id, 'rejected')} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"><X size={16} /></button>
                                    </div>
                                </div>
                            )}

                            {tab === 'withdrawals' && (
                                <div className="flex flex-col gap-3">
                                    <div className="bg-black/5 p-2 rounded-lg border border-black/5 text-[10px] grid grid-cols-2 gap-2">
                                        <div><span className="text-slate-500">Acc:</span> {item.bankDetails?.accountNo}</div>
                                        <div><span className="text-slate-500">IFSC:</span> {item.bankDetails?.ifsc}</div>
                                        <div className="col-span-2"><span className="text-slate-500">Holder:</span> {item.bankDetails?.name}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAction(item._id, 'approved')} className="flex-1 py-2 bg-green-600 text-slate-800 rounded-lg font-bold text-xs">APPROVE</button>
                                        <button onClick={() => handleAction(item._id, 'rejected')} className="flex-1 py-2 bg-red-600 text-slate-800 rounded-lg font-bold text-xs">REJECT</button>
                                    </div>
                                </div>
                            )}

                            {tab === 'users' && !item.isAdmin && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleBlock(item._id, item.isBlocked)}
                                        className={`flex-1 py-2 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 ${item.isBlocked ? 'bg-orange-500 text-slate-800' : 'bg-slate-700 text-slate-600'}`}
                                    >
                                        <Ban size={12} /> {item.isBlocked ? 'UNBLOCK' : 'BLOCK'}
                                    </button>
                                    <button
                                        onClick={() => addManualBalance(item._id)}
                                        className="flex-1 py-2 bg-accent text-slate-800 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1"
                                    >
                                        <PlusCircle size={12} /> ADD CASH
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Admin;
