import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, UserPlus, Award, Copy, Check } from 'lucide-react';

const Team = () => {
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamRes, profileRes] = await Promise.all([
                    api.get('/team'),
                    api.get('/auth/profile')
                ]);
                setTeamData(teamRes.data);
                setProfile(profileRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const copyToClipboard = () => {
        const link = `${window.location.origin}/register?ref=${profile?.referralCode}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="flex flex-col gap-6 pb-10">
            <div className="text-center py-4">
                <h1 className="text-2xl font-bold gold-text">My Team</h1>
                <p className="text-slate-500 text-sm">Build your network, earn together</p>
            </div>

            {/* Referral Link Card */}
            <div className="glass-card flex flex-col gap-4 bg-gradient-to-br from-indigo-900/20 to-transparent">
                <div className="flex items-center gap-3">
                    <UserPlus className="text-accent" />
                    <h3 className="font-bold">Referral Program</h3>
                </div>
                <p className="text-sm text-slate-500">Share your link and earn 10% commission on every investment your team members make.</p>
                <div className="bg-black/5 p-3 rounded-xl border border-black/5 flex items-center justify-between">
                    <span className="text-xs font-mono truncate mr-2">{window.location.origin}/register?ref={profile?.referralCode}</span>
                    <button onClick={copyToClipboard} className="text-accent hover:text-slate-800 transition-colors">
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                </div>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card flex flex-col items-center gap-2">
                    <Users className="text-accent" size={32} />
                    <span className="text-slate-500 text-xs">Total Members</span>
                    <span className="text-2xl font-bold">{teamData?.teamSize || 0}</span>
                </div>
                <div className="glass-card flex flex-col items-center gap-2">
                    <Award className="text-gold" size={32} />
                    <span className="text-slate-500 text-xs">Total Earnings</span>
                    <span className="text-2xl font-bold">₹{profile?.referralIncome || 0}</span>
                </div>
            </div>

            {/* Members List */}
            <div className="flex flex-col gap-4 mt-2">
                <h3 className="font-bold px-1">Recent Team Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamData?.teamMembers?.length > 0 ? (
                        teamData.teamMembers.map((member, idx) => (
                            <div key={idx} className="glass-card flex items-center justify-between border-l-4 border-l-accent">
                                <div>
                                    <p className="font-bold">{member.name}</p>
                                    <p className="text-xs text-slate-500">{member.mobile}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-400 text-sm font-mono">+₹{member.totalIncome}</p>
                                    <p className="text-[10px] text-slate-600 italic">Total Earned</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-500 italic">No team members yet. Start sharing!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Team;
