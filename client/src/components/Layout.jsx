import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    if (!user) return <Navigate to="/login" />;

    return (
        <div className="min-h-screen bg-primary">
            <div className="max-w-4xl mx-auto min-h-screen pb-24 px-4 pt-6 md:pt-10">
                <Outlet />
                <Navbar />
            </div>
        </div>
    );
};

export default Layout;
