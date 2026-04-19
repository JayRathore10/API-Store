import React from 'react';

const Hero = () => {
    return (
        <section className="bg-white py-24 px-6">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

                {/* Top Badge */}
                <div className="mb-10">
                    <span className="border border-gray-300 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase">
                        Engineered for Builders
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-normal text-[#1e293b] leading-[1.1] mb-8 tracking-tight">
                    Discover and <br />
                    Integrate <span className="italic font-light text-gray-500">Powerful APIs</span>
                </h1>

                {/* Subtext */}
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-12">
                    Find, test, and integrate APIs in minutes. A curated gallery of
                    technical excellence designed for modern development workflows.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:row items-center justify-center gap-4 w-full sm:w-auto">
                    <button className="bg-[#111111] text-white px-10 py-4 rounded-full font-medium hover:bg-black transition-all w-full sm:w-auto">
                        Explore APIs
                    </button>
                    <button className="bg-white text-[#111111] border border-gray-300 px-10 py-4 rounded-full font-medium hover:bg-gray-50 transition-all w-full sm:w-auto">
                        Publish Yours
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Hero;