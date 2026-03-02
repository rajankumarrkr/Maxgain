import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Users, User } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { name: 'Home', icon: <Home size={24} />, path: '/' },
        { name: 'Plan', icon: <LayoutGrid size={24} />, path: '/plans' },
        { name: 'Team', icon: <Users size={24} />, path: '/team' },
        { name: 'Mine', icon: <User size={24} />, path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-md border-t border-black/10 px-6 py-3 pb-6 z-50">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-accent scale-110' : 'text-slate-500'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="text-[10px] font-medium uppercase tracking-wider">{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
