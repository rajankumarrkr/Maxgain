import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { IndianRupee, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
    const [profile, setProfile] = useState(null);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await api.get('/auth/profile');
            setProfile(data);
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount < 300) return setError('Minimum withdrawal is ₹300');
        if (amount > profile?.walletBalance) return setError('Insufficient balance');

        setLoading(true);
        try {
            await api.post('/wallet/withdraw', { amount });
            setSuccess(true);
            setTimeout(() => navigate('/profile'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Withdrawal failed');
        } finally {
            setLoading(false);
        }
    };

    const gstAmount = amount * 0.15;
    const finalAmount = amount - gstAmount;

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
                <div className="bg-green-500/20 p-6 rounded-full">
                    <ShieldCheck size={64} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Withdrawal Requested</h2>
                <p className="text-slate-500">Funds will be credited to your bank account within 24 hours.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold gold-text text-center">Withdraw Funds</h1>

            <div className="glass-card flex flex-col gap-6">
                <div className="text-center p-4 bg-black/5 rounded-2xl">
                    <p className="text-xs text-slate-500">Withdrawable Balance</p>
                    <h2 className="text-2xl font-bold text-slate-800 mt-1">₹{profile?.walletBalance.toLocaleString()}</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-500 px-1">Withdrawal Amount (Min ₹300)</label>
                        <div className="flex items-center gap-3 bg-black/5 p-4 rounded-xl border border-black/5">
                            <IndianRupee className="text-accent" size={20} />
                            <input
                                type="number"
                                placeholder="Enter Amount"
                                className="bg-transparent border-none outline-none w-full text-slate-800 text-lg font-bold"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="bg-black/5 p-4 rounded-xl border border-black/5 flex flex-col gap-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Service Fee (15% GST)</span>
                            <span className="text-red-400">-₹{gstAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold border-t border-black/5 pt-2 mt-1">
                            <span className="text-slate-600">Net Amount</span>
                            <span className="text-green-400">₹{finalAmount > 0 ? finalAmount.toFixed(2) : '0.00'}</span>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center font-bold px-2">{error}</p>}

                    {!profile?.bankDetails?.accountNo ? (
                        <button
                            type="button"
                            onClick={() => navigate('/bank-details')}
                            className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 py-4 rounded-2xl font-bold"
                        >
                            PLEASE ADD BANK DETAILS FIRST
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="premium-btn w-full flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing...' : 'CONFIRM WITHDRAWAL'}
                        </button>
                    )}
                </form>
            </div>

            <div className="glass-card mt-2">
                <h4 className="font-bold text-sm mb-3">Target Bank Account:</h4>
                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Holder:</span> <span className="text-slate-800 font-medium">{profile?.bankDetails?.name || '-'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Account:</span> <span className="text-slate-800 font-medium">{profile?.bankDetails?.accountNo || '-'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">IFSC:</span> <span className="text-slate-800 font-medium">{profile?.bankDetails?.ifsc || '-'}</span></div>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
