import React from 'react';
import { BrainCircuit, Banknote, CloudSun, Map, ArrowRight } from 'lucide-react';

const Categories = () => {
    const categoryData = [
        {
            title: "AI & ML",
            description: "Large language models and neural processing units.",
            count: "142 APIS",
            icon: <BrainCircuit size={24} className="text-gray-700" />,
            iconBg: "bg-purple-50",
        },
        {
            title: "Payments",
            description: "Secure transaction gateways and billing automation.",
            count: "89 APIS",
            icon: <Banknote size={24} className="text-gray-700" />,
            iconBg: "bg-gray-100",
        },
        {
            title: "Weather",
            description: "Real-time meteorological data and forecasts.",
            count: "54 APIS",
            icon: <CloudSun size={24} className="text-gray-700" />,
            iconBg: "bg-gray-100",
        },
        {
            title: "Maps",
            description: "Geospatial data and interactive mapping tools.",
            count: "76 APIS",
            icon: <Map size={24} className="text-gray-700" />,
            iconBg: "bg-gray-100",
        }
    ];

    return (
        <section className="bg-[#f8fafc] py-24 px-6 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-normal text-[#1e293b] mb-3 tracking-tight">
                            Browse Categories
                        </h2>
                        <p className="text-xl text-gray-500 font-light">
                            Specialized tools for every dimension of your architecture.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="flex items-center text-gray-600 hover:text-black font-medium transition-colors"
                    >
                        View all <ArrowRight size={18} className="ml-2" />
                    </a>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryData.map((category, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-full ${category.iconBg} flex items-center justify-center mb-8`}>
                                {category.icon}
                            </div>

                            {/* Text Content */}
                            <h3 className="text-2xl font-normal text-[#1e293b] mb-4">
                                {category.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed mb-12 grow">
                                {category.description}
                            </p>

                            {/* API Count Badge */}
                            <div className="mt-auto">
                                <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                                    {category.count}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Categories;