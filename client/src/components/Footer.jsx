import React from 'react';
import { Megaphone, Terminal, Share2 } from 'lucide-react';

const Footer = () => {
    const footerSections = [
        {
            title: "PLATFORM",
            links: ["Explore", "Categories", "Pricing"],
        },
        {
            title: "RESOURCES",
            links: ["Documentation", "API Status", "Community"],
        },
        {
            title: "COMPANY",
            links: ["About Us", "Careers", "Privacy"],
        },
        {
            title: "SUPPORT", // Changed from duplicate 'Company' for better UX
            links: ["Contact", "Help Center", "Status"],
        },
    ];

    return (
        <footer className="bg-[#f8fafc] text-[#1e293b] pt-16 pb-8 px-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="md:col-span-4 lg:col-span-5">
                        <div className="text-2xl font-semibold mb-6 flex items-center tracking-tight">
                            <span className="text-gray-400 font-light">API</span>
                            <span className="ml-2">Marketplace</span>
                        </div>
                        <p className="text-gray-500 leading-relaxed max-w-xs">
                            The definitive destination for elite API commerce and
                            architectural integration for modern teams.
                        </p>
                    </div>

                    {/* Links Sections */}
                    <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-[11px] font-bold tracking-[0.15em] text-black mb-6 uppercase">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <a href={`#${link.toLowerCase()}`} className="text-gray-500 hover:text-black transition-colors text-[14px]">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8 flex items-center justify-between gap-4">
                    <p className="text-[11px] tracking-widest text-gray-400 uppercase">
                        © 2026 API MARKETPLACE STORE. ALL RIGHTS RESERVED.
                    </p>

                    <div className="flex items-center space-x-6 text-gray-400">
                        <a href="#" className="hover:text-black transition-colors"><Megaphone size={18} /></a>
                        <a href="#" className="hover:text-black transition-colors"><Terminal size={18} /></a>
                        <a href="#" className="hover:text-black transition-colors"><Share2 size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;