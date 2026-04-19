import React from 'react';
import { BadgeCheck, Code, Shield } from 'lucide-react';

const DeveloperSection = () => {
    const features = [
        {
            icon: <BadgeCheck size={24} className="text-slate-500" />,
            title: "Automated Testing",
            description: "Every API is stress-tested daily to ensure 99.99% uptime and reliability."
        },
        {
            icon: <Code size={24} className="text-slate-500" />,
            title: "SDK Generation",
            description: "Auto-generate client libraries in 12+ languages instantly with one click."
        },
        {
            icon: <Shield size={24} className="text-slate-500" />,
            title: "Unified Auth",
            description: "Single key management for your entire architectural stack and integrations."
        }
    ];

    return (
        <section className="bg-[#0f1423] py-24 px-6 font-sans text-slate-300 min-h-screen flex items-center">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Text & Features */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-12 leading-[1.2]">
                        <span className="text-white">Built for Developers,</span>
                        <br />
                        <span className="text-slate-600">By Developers.</span>
                    </h2>

                    <div className="space-y-10">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="mt-1">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-lg mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Code Window */}
                <div className="relative">
                    {/* Subtle background glow effect (optional, adds depth) */}
                    <div className="absolute -inset-1 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />

                    <div className="relative bg-[#1a2035] rounded-xl border border-white/5 shadow-2xl overflow-hidden">

                        {/* IDE Header */}
                        <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#1a2035]">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                                <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                            </div>
                            <div className="flex-1 text-center pr-12">
                                <span className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase">
                                    integration_example.js
                                </span>
                            </div>
                        </div>

                        {/* IDE Code Body */}
                        <div className="p-6 overflow-x-auto text-sm md:text-[15px] font-mono leading-loose">
                            <pre>
                                <code className="text-slate-300">
                                    <span className="text-purple-400">const</span> api = <span className="text-blue-400">require</span>(<span className="text-green-300">'arch-api'</span>);{'\n\n'}
                                    <span className="text-slate-500">// Initialize with zero latency</span>{'\n'}
                                    <span className="text-purple-400">const</span> store = <span className="text-purple-400">new</span> api.<span className="text-blue-300">Store</span>({`{`}{'\n'}
                                    {'  '}key: process.env.API_KEY,{'\n'}
                                    {'  '}region: <span className="text-green-300">'global-cluster'</span>{'\n'}
                                    {`});`}{'\n\n'}
                                    <span className="text-purple-400">await</span> store.<span className="text-blue-300">connect</span>({`{`}{'\n'}
                                    {'  '}endpoint: <span className="text-green-300">'/v4/neural-connect'</span>,{'\n'}
                                    {'  '}priority: <span className="text-green-300">'high-end'</span>{'\n'}
                                    {`});`}{'\n\n'}
                                    console.<span className="text-blue-300">log</span>(<span className="text-green-300">"Architecture Ready."</span>);
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DeveloperSection;