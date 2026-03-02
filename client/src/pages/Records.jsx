import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {
    Clock,
    ArrowUpCircle,
    ArrowDownCircle,
    PlusCircle,
    Zap,
    HelpCircle,
    CheckCircle2,
    XCircle,
    AlertCircle
} from 'lucide-react';

const Records = ({ type }) => { // type: 'income' or 'withdrawal'
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await api.get('/wallet/history');
                if (type === 'withdrawal') {
                    setTransactions(data.filter(t => t.type === 'withdrawal'));
                } else {
                    // Income records (ROI, Commission, Recharge as well for simplicity)
                    setTransactions(data.filter(t => t.type !== 'withdrawal'));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [type]);

    const getIcon = (type, status) => {
        if (type === 'withdrawal') return <ArrowDownCircle className="text-red-400" />;
        if (type === 'recharge') return <PlusCircle className="text-accent" />;
        if (type === 'roi_credit') return <Zap className="text-gold" />;
        if (type === 'referral_commission') return <Zap className="text-green-400" />;
        return <HelpCircle className="text-slate-500" />;
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'approved':
            case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    if (loading) return <div className="text-center mt-20">Loading records...</div>;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold gold-text text-center px-4 py-2">
                {type === 'withdrawal' ? 'Withdrawal History' : 'Income Record'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {transactions.length > 0 ? (
                    transactions.map((t, idx) => (
                        <div key={idx} className="glass-card flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="bg-black/5 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                                    {getIcon(t.type, t.status)}
                                </div>
                                <div>
                                    <p className="font-bold capitalize text-sm">{t.type.replace('_', ' ')}</p>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                                        <Clock size={10} />
                                        {new Date(t.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1.5">
                                <p className={`font-black tracking-tight ${t.type === 'withdrawal' ? 'text-slate-800' : 'text-accent'}`}>
                                    {t.type === 'withdrawal' ? '-' : '+'}₹{t.amount}
                                </p>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusStyles(t.status)} font-bold`}>
                                    {t.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 text-slate-600 italic">No transactions found.</div>
                )}
            </div>
        </div>
    );
};

export default Records;
