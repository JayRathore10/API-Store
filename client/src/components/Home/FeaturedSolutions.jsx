import React from 'react';
import { Star } from 'lucide-react';

const FeaturedSolutions = () => {
    const solutions = [
        {
            id: 1,
            title: "NeuralConnect 4.0",
            rating: "4.9",
            category: "AI & AUTOMATION",
            description: "High-performance LLM orchestration for automated customer support systems.",
            badge: "FREE",
            image: "/feature1.png",
            techCircles: ["bg-slate-100", "bg-slate-200", "bg-slate-300"]
        },
        {
            id: 2,
            title: "GlobalPay Pro",
            rating: "4.8",
            category: "FINTECH",
            description: "Enterprise-grade multi-currency settlement gateway with fraud detection.",
            badge: "PAID",
            image: "/feature2.png",
            techCircles: ["bg-slate-100", "bg-slate-200"]
        },
        {
            id: 3,
            title: "EcoMetric API",
            rating: "4.7",
            category: "ENVIRONMENTAL",
            description: "Real-time carbon footprint calculation and environmental impact metrics.",
            badge: "FREE",
            image: "assets/feature3.png",
            techCircles: ["bg-slate-100", "bg-slate-200", "bg-slate-300", "bg-slate-400"]
        }
    ];

    return (
        <section className="py-24 px-6 font-sans min-h-screen">
            <div className="max-w-6xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-tight">
                        Featured Solutions
                    </h2>
                    <p className="text-gray-800 text-sm md:text-base">
                        Top-rated technical integrations verified for production environments.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((solution) => (
                        <div
                            key={solution.id}
                            className="bg-white rounded-4xl overflow-hidden flex flex-col shadow-2xl"
                        >

                            {/* Image Header with Badge */}
                            <div className="relative h-56 w-full bg-gray-100">
                                <img
                                    src={solution.image}
                                    alt={solution.title}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className={`absolute top-5 right-5 text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase ${solution.badge === 'FREE'
                                        ? 'bg-white text-gray-800'
                                        : 'bg-gray-800/80 backdrop-blur-sm text-white'
                                        }`}
                                >
                                    {solution.badge}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-8 flex flex-col grow">

                                {/* Title & Rating */}
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-normal text-gray-900">
                                        {solution.title}
                                    </h3>
                                    <div className="flex items-center text-sm font-medium text-gray-600">
                                        <Star size={14} className="fill-current text-gray-800 mr-1.5" />
                                        {solution.rating}
                                    </div>
                                </div>

                                {/* Category */}
                                <p className="text-[10px] font-bold tracking-[0.15em] text-gray-800 uppercase mb-5">
                                    {solution.category}
                                </p>

                                {/* Description */}
                                <p className="text-gray-500 text-[15px] leading-relaxed mb-10 grow">
                                    {solution.description}
                                </p>

                                {/* Card Footer */}
                                <div className="flex justify-between items-center pt-6 border-t border-gray-50">

                                    {/* Overlapping Tech Circles */}
                                    <div className="flex -space-x-3">
                                        {solution.techCircles.map((colorClass, index) => (
                                            <div
                                                key={index}
                                                className={`w-8 h-8 rounded-full border-[3px] border-white ${colorClass}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Action Link */}
                                    <button className="text-[14px] font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                                        Integrate
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedSolutions;