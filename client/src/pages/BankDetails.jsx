import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { User, CreditCard, Landmark, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BankDetails = () => {
    const [formData, setFormData] = useState({
        name: '',
        accountNo: '',
        ifsc: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await api.get('/auth/profile');
            if (data.bankDetails) {
                setFormData({
                    name: data.bankDetails.name || '',
                    accountNo: data.bankDetails.accountNo || '',
                    ifsc: data.bankDetails.ifsc || ''
                });
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/wallet/bank-details', formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold gold-text text-center">Bank Account</h1>

            {success && (
                <div className="bg-green-500/20 text-green-400 p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} /> Bank Details Updated!
                </div>
            )}

            <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-500 font-bold px-1">ACCOUNT HOLDER NAME</label>
                    <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/5">
                        <User className="text-accent" size={18} />
                        <input
                            type="text"
                            placeholder="Full Name as per Bank"
                            className="bg-transparent border-none outline-none w-full text-white"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-500 font-bold px-1">ACCOUNT NUMBER</label>
                    <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/5">
                        <CreditCard className="text-accent" size={18} />
                        <input
                            type="text"
                            placeholder="Bank Account Number"
                            className="bg-transparent border-none outline-none w-full text-white font-mono"
                            value={formData.accountNo}
                            onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-500 font-bold px-1">IFSC CODE</label>
                    <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/5">
                        <Landmark className="text-accent" size={18} />
                        <input
                            type="text"
                            placeholder="Bank IFSC Code"
                            className="bg-transparent border-none outline-none w-full text-white uppercase font-mono"
                            value={formData.ifsc}
                            onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="premium-btn mt-4">
                    {loading ? 'Saving Changes...' : 'SAVE BANK DETAILS'}
                </button>
            </form>
        </div>
    );
};

export default BankDetails;
