import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Menu, X, Star, ArrowRight, BrainCircuit,
    Map, Wallet, LineChart, Cloud, ChevronDown
} from 'lucide-react';
import { useApiInfoStore } from '../store/apiInfo';

const Explore = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const apiInfo = useApiInfoStore()
    // Mock Data for the Grid
    const apis = [
        {
            id: 1,
            type: 'standard',
            title: 'NeuralNode Insight',
            desc: 'Advanced sentiment analysis and entity recognition for high-volume...',
            badge: 'SUBSCRIPTION',
            rating: 4.9,
            reviews: '1.2k',
            icon: <BrainCircuit size={20} className="text-gray-700" />,
            colSpan: 'col-span-1'
        },
        {
            id: 2,
            type: 'featured',
            title: 'AeroMap Spatial Engine',
            desc: 'Ultra-low latency geospatial indexing for logistics and urban planning. Supports up to 50,000 concurrent vector queries.',
            badges: ['FEATURED', 'FREE TIER'],
            stats: { latency: '12ms', uptime: '99.99%' },
            colSpan: 'col-span-1 md:col-span-2'
        },
        {
            id: 3,
            type: 'standard',
            title: 'LedgerSync Core',
            desc: 'Immutable transaction logging for private blockchain networks with...',
            badge: 'ONE-TIME',
            rating: 4.7,
            reviews: '840',
            icon: <Wallet size={20} className="text-gray-700" />,
            colSpan: 'col-span-1'
        },
        {
            id: 4,
            type: 'standard',
            title: 'MetricFlow Pro',
            desc: 'Real-time infrastructure monitoring with predictive anomaly detection...',
            badge: 'SUBSCRIPTION',
            rating: 4.8,
            reviews: '2.5k',
            icon: <LineChart size={20} className="text-gray-700" />,
            colSpan: 'col-span-1'
        },
        {
            id: 5,
            type: 'standard',
            title: 'StaticAsset CDN',
            desc: 'Edge-optimized content delivery network for high-resolution static...',
            badge: 'FREE',
            rating: 4.5,
            reviews: '520',
            icon: <Cloud size={20} className="text-gray-700" />,
            colSpan: 'col-span-1'
        }
    ];

    return (
        <div className="flex min-h-screen bg-[#f3f4f6] font-sans">

            {/* Mobile/Toggle Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#f8fafc] border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500 font-bold">✧</span>
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-900 text-sm">Developer Portal</h2>
                                <p className="text-xs text-gray-500">Enterprise Tier</p>
                            </div>
                        </div>
                        <button className="lg:hidden text-gray-500" onClick={() => setIsSidebarOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex-1 space-y-8 overflow-y-auto">
                        {/* Category */}
                        <div>
                            <h3 className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-4">Category</h3>
                            <div className="space-y-3">
                                {['Artificial Intelligence', 'Data Analytics', 'FinTech Solutions', 'Geolocation'].map((item) => (
                                    <label key={item} className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800" />
                                        <span className="text-sm text-gray-600">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Pricing Model */}
                        <div>
                            <h3 className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-4">Pricing Model</h3>
                            <div className="space-y-3">
                                {['Free', 'One-time Payment', 'Subscription'].map((item) => (
                                    <label key={item} className="flex items-center space-x-3 cursor-pointer">
                                        <input type="radio" name="pricing" className="w-4 h-4 border-gray-300 text-gray-800 focus:ring-gray-800" />
                                        <span className="text-sm text-gray-600">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Minimum Rating */}
                        <div>
                            <h3 className="text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase mb-4">Minimum Rating</h3>
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4].map((star) => (
                                    <Star key={star} size={16} className="fill-gray-700 text-gray-700" />
                                ))}
                                <Star size={16} className="text-gray-300" />
                                <span className="text-sm text-gray-600 ml-2 font-medium">4.0+</span>
                            </div>
                        </div>
                    </div>

                    {/* Create Button */}
                    <div className="pt-6 border-t border-gray-200 mt-auto">
                        <button className="w-full bg-[#52525b] text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                            + Create New API
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full min-h-screen">
                <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">

                    {/* Header Area */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div className="max-w-2xl">
                            {/* Hamburger Menu (Visible when sidebar is closed/mobile) */}
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 bg-white px-4 py-2 rounded-lg shadow-sm"
                            >
                                <Menu size={20} />
                                <span className="text-sm font-medium">Filters</span>
                            </button>

                            <h4 className="text-[11px] font-bold tracking-[0.2em] text-gray-900 uppercase mb-4">
                                Curated Marketplace
                            </h4>
                            <h1 className="text-4xl md:text-5xl font-light text-[#1e293b] leading-[1.1] mb-4 tracking-tight">
                                Discover the next generation of architectural APIs.
                            </h1>
                            <p className="text-lg text-gray-500 font-light leading-relaxed">
                                Access 2,400+ high-performance endpoints designed with tactile precision for modern enterprise systems.
                            </p>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="mt-6 md:mt-0 flex items-center space-x-3">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 flex items-center shadow-sm hover:bg-gray-50 transition-colors">
                                Most Popular <ChevronDown size={16} className="ml-2 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {apis.map((api) => {

                            if (api.type === 'featured') {
                                return (
                                    <Link key={api.id} to={`/api/${api.id}`} state={{ api }} className={`bg-[#5e636e] rounded-3xl p-8 flex flex-col justify-between shadow-lg hover:opacity-95 transition-opacity ${api.colSpan}`}>
                                        <div>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {api.badges.map(badge => (
                                                    <span key={badge} className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-sm">
                                                        {badge}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-3xl text-white font-light mb-4 leading-tight max-w-sm">
                                                {api.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mb-8">
                                                {api.desc}
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
                                            <div className="flex space-x-8">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-1">Latency</p>
                                                    <p className="text-xl text-white font-medium">{api.stats.latency}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-1">Uptime</p>
                                                    <p className="text-xl text-white font-medium">{api.stats.uptime}</p>
                                                </div>
                                            </div>
                                            <span className="bg-white text-gray-900 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors inline-block text-center mt-4 sm:mt-0">
                                                Get Started
                                            </span>
                                        </div>
                                    </Link>
                                );
                            }

                            return (
                                <Link key={api.id} to={`/api/${api.id}`} state={{ api }} className={`bg-white rounded-3xl p-7 flex flex-col shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${api.colSpan}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                            {api.icon}
                                        </div>
                                        <span className="px-3 py-1 bg-[#e2e4e7] text-gray-700 text-[10px] font-bold tracking-widest uppercase rounded-full">
                                            {api.badge}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-normal text-gray-900 mb-3">
                                        {api.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed grow mb-8">
                                        {api.desc}
                                    </p>

                                    <div className="flex justify-between items-center pt-5 border-t border-gray-50">
                                        <div className="flex items-center text-sm font-medium text-gray-700">
                                            <Star size={14} className="fill-current text-gray-800 mr-1.5" />
                                            {api.rating} <span className="text-gray-400 font-normal ml-1">({api.reviews})</span>
                                        </div>
                                        <span className="text-[13px] font-semibold text-gray-800 flex items-center hover:text-gray-500 transition-colors">
                                            View Details <ArrowRight size={14} className="ml-1" />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Explore;