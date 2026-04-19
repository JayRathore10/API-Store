import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';

/* Helper: get initials from a name */
const getInitials = (name = '') =>
    name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase();

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const { user, logout } = useAuthStore();
    const { addToast } = useToastStore();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        setDropdownOpen(false);
        addToast({ message: 'You have been logged out.', type: 'info' });
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-gray-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-10">
                    <Link to="/" className="flex items-center text-xl font-semibold tracking-tight">
                        <span className="text-gray-500 font-light">API</span>
                        <span className="text-[#0f172a] ml-1">Marketplace</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6 text-gray-500">
                        <Link to="/explore" className="hover:text-black transition-colors text-sm">Explore</Link>
                        <Link to="/categories" className="hover:text-black transition-colors text-sm">Categories</Link>
                        <Link to="/pricing" className="hover:text-black transition-colors text-sm">Pricing</Link>
                    </div>
                </div>

                <div className="hidden lg:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search APIs..."
                            className="w-70% bg-[#f8fafc] border border-gray-300 rounded-full py-2 px-6 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                        />
                    </div>
                </div>

                {/* ─── Auth Section (Desktop) ──────────────────────────── */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        /* Logged-in: avatar + name + dropdown */
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((v) => !v)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                {/* Avatar */}
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-xs font-semibold">
                                        {getInitials(user.name)}
                                    </div>
                                )}
                                <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">
                                    {user.name}
                                </span>
                                <ChevronDown
                                    size={14}
                                    className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-1.5 z-50 animate-[fadeIn_0.15s_ease]">
                                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                        <p className="text-xs font-semibold text-gray-800 truncate">{user.name}</p>
                                        <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        to="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <User size={14} /> Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                                    >
                                        <LogOut size={14} /> Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Logged-out: Login + Sign Up buttons */
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-black text-sm transition-colors">
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-all"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* ─── Hamburger (Mobile) ───────────────────────────────── */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* ─── Mobile Menu ─────────────────────────────────────────── */}
            {isOpen && (
                <div className="md:hidden mt-4 pb-4 space-y-4 pt-4 border-t border-gray-100">
                    <Link to="/explore" className="block text-gray-600 px-2 py-1" onClick={() => setIsOpen(false)}>Explore</Link>
                    <Link to="/categories" className="block text-gray-600 px-2 py-1" onClick={() => setIsOpen(false)}>Categories</Link>
                    <Link to="/pricing" className="block text-gray-600 px-2 py-1" onClick={() => setIsOpen(false)}>Pricing</Link>

                    <div className="pt-3 border-t border-gray-100">
                        {user ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 px-2 py-2">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-sm font-semibold">
                                            {getInitials(user.name)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="w-full flex items-center gap-2 px-2 py-2 text-sm text-rose-600 hover:text-rose-800 transition-colors"
                                >
                                    <LogOut size={14} /> Log out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-3">
                                <Link
                                    to="/login"
                                    className="text-center text-gray-700 border-gray-700 rounded-full px-4 py-2 border hover:text-black transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-center bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;