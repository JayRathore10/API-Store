import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { signup, isLoading } = useAuthStore();
    const { addToast } = useToastStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signup(formData.name, formData.email, formData.password);
        if (result.success) {
            addToast({ message: 'Account created! Welcome to API Marketplace.', type: 'success' });
            navigate('/');
        } else {
            addToast({ message: result.message || 'Signup failed. Please try again.', type: 'error' });
        }
    };

    const handleOAuth = (provider) => {
        if (provider === 'github') {
            window.location.href = 'http://localhost:3000/api/v1/auth/github';
        }
    };

    return (
        <div className="min-h-screen bg-[#e2e4e7] flex flex-col items-center justify-center p-6 font-sans">

            {/* Brand Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-light text-gray-800 tracking-tight flex items-center justify-center">
                    <span className="text-gray-500 mr-1">API</span>
                    <span className="font-normal text-[#1e293b]">Marketplace</span>
                </h1>
                <p className="text-[10px] md:text-xs text-gray-500 tracking-[0.15em] mt-3 uppercase font-medium">
                    Enterprise Developer Portal
                </p>
            </div>

            {/* Auth Card */}
            <div className="bg-white w-full max-w-[420px] rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-300/50">

                <div className="mb-8">
                    <h2 className="text-2xl font-normal text-gray-900 mb-2">
                        Create an account
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Sign up to get your API keys and start building.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full bg-[#f3f4f6] text-gray-900 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all placeholder:text-gray-400"
                            />
                            <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                required
                                className="w-full bg-[#f3f4f6] text-gray-900 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all placeholder:text-gray-400"
                            />
                            <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full bg-[#f3f4f6] text-gray-900 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all placeholder:text-gray-400 font-medium tracking-widest"
                            />
                            <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white rounded-xl py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="relative flex items-center py-6">
                    <div className="grow border-t border-gray-100"></div>
                    <span className="shrink-0 mx-4 text-[10px] text-gray-400 uppercase tracking-widest">
                        or continue with
                    </span>
                    <div className="grow border-t border-gray-100"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleOAuth('github')}
                        type="button"
                        className="w-full bg-[#f3f4f6] text-gray-700 rounded-xl py-3 text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                        GitHub
                    </button>
                    <button
                        onClick={() => handleOAuth('google')}
                        type="button"
                        className="w-full bg-[#f3f4f6] text-gray-700 rounded-xl py-3 text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                        Google
                    </button>
                </div>

            </div>

            <div className="mt-8 text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-gray-900 hover:underline font-medium">
                    Sign In
                </Link>
            </div>

        </div>
    );
};

export default SignupPage;