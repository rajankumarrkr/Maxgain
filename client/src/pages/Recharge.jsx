import React, { useState } from 'react';
import api from '../api/axios';
import { IndianRupee, CreditCard, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Recharge = () => {
    const [amount, setAmount] = useState('');
    const [utr, setUtr] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount < 300) return setError('Minimum recharge is ₹300');
        setLoading(true);
        try {
            await api.post('/wallet/recharge', { amount, utr });
            setSuccess(true);
            setTimeout(() => navigate('/profile'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Deposit failed');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
                <div className="bg-green-500/20 p-6 rounded-full">
                    <CheckCircle2 size={64} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Request Submitted!</h2>
                <p className="text-slate-400">Admin will verify and credit your wallet within 30-60 minutes.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold gold-text text-center">Recharge Wallet</h1>

            <div className="glass-card flex flex-col gap-6">
                <div className="text-center p-4 bg-accent/5 rounded-2xl border border-accent/20">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Pay to UPI / Scan QR</p>
                    <h2 className="text-xl font-mono font-bold text-accent mt-2">maxgain.pay@upi</h2>
                    <p className="text-[10px] text-slate-500 mt-1 italic">Scan QR code from your app or pay to UPI ID</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-400 px-1">Recharge Amount (Min ₹300)</label>
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 focus-within:border-accent/40 transition-all">
                            <IndianRupee className="text-accent" size={20} />
                            <input
                                type="number"
                                placeholder="Enter Amount"
                                className="bg-transparent border-none outline-none w-full text-white text-lg font-bold"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-400 px-1">UTR / Transaction ID</label>
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 focus-within:border-accent/40 transition-all">
                            <CreditCard className="text-accent" size={20} />
                            <input
                                type="text"
                                placeholder="12 Digit UTR Number"
                                className="bg-transparent border-none outline-none w-full text-white font-mono"
                                value={utr}
                                onChange={(e) => setUtr(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="premium-btn w-full mt-4 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Submitting...' : 'SUBMIT RECHARGE'}
                    </button>
                </form>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl">
                <h4 className="text-yellow-500 font-bold text-sm mb-1">Important Note:</h4>
                <ul className="text-xs text-slate-400 list-disc ml-4 flex flex-col gap-1">
                    <li>Always double check the UTR number before submitting.</li>
                    <li>Recharge approval usually takes 30-60 minutes.</li>
                    <li>Do not submit fake UTRs, it may lead to account ban.</li>
                </ul>
            </div>
        </div>
    );
};

export default Recharge;
