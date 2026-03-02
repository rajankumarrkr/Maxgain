import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

const Plans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const { data } = await api.get('/plans');
                setPlans(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handleInvest = async (planId) => {
        try {
            await api.post('/plans/invest', { planId });
            setMessage({ text: 'Investment successful!', type: 'success' });
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (err) {
            setMessage({ text: err.response?.data?.message || 'Investment failed', type: 'error' });
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        }
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="flex flex-col gap-6 pb-10">
            <div className="text-center py-4">
                <h1 className="text-2xl font-bold gold-text">Sustainable Plans</h1>
                <p className="text-slate-500 text-sm">Choose a plan that fits your goal</p>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl text-center font-bold ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map((plan) => (
                    <div key={plan._id} className="glass-card relative overflow-hidden group hover:border-accent/50 transition-all border border-black/5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-accent transition-colors">{plan.name}</h3>
                                <p className="text-slate-500 text-sm flex items-center gap-1">
                                    <Clock size={14} /> {plan.duration} Days Duration
                                </p>
                            </div>
                            <div className="bg-accent/10 p-2 rounded-xl">
                                <TrendingUp className="text-accent" size={24} />
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Investment</span>
                                <span className="text-2xl font-black text-slate-800">₹{plan.price}</span>
                            </div>
                            <div className="flex flex-col gap-1 text-right">
                                <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Daily ROI</span>
                                <span className="text-2xl font-black text-green-400 font-mono">₹{plan.dailyROI}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-black/5 flex flex-col gap-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Total Return</span>
                                <span className="gold-text font-bold">₹{(plan.dailyROI * plan.duration).toLocaleString()}</span>
                            </div>
                            <button
                                onClick={() => handleInvest(plan._id)}
                                className="premium-btn w-full"
                            >
                                BUY NOW
                            </button>
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plans;
