import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, Check, Circle } from 'lucide-react';

const APIdetail = () => {
    const location = useLocation();
    const api = location.state?.api;

    const title = api?.title || "NeuralPath Vision Engine";
    const desc = api?.desc || "High-fidelity spatial analysis for architectural planning.";
    const rating = api?.rating || 4.9;
    const reviews = api?.reviews || "2.4k";

    const [activeTab, setActiveTab] = useState('Overview');
    const [activeLang, setActiveLang] = useState('Node.js');
    
    const tabs = ['Overview', 'Documentation', 'Pricing', 'Reviews', 'Endpoint Console'];
    const languages = ['Node.js', 'Python', 'cURL'];

    const codeSnippets = {
        'Node.js': `const axios = require('axios');

const response = await axios.post('https://api.cognistruct.com/v1/vision/analyze', {
  image_url: 'https://example.com/schematic.png'
}, {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);`,
        'Python': `import requests      
response = requests.post(
    'https://api.cognistruct.com/v1/vision/analyze',
    json={'image_url': 'https://example.com/schematic.png'},
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)

print(response.json())`,
        'cURL': `curl -X POST https://api.cognistruct.com/v1/vision/analyze \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{"image_url": "https://example.com/schematic.png"}'`
    };  

    const pricingPlans = [
        {
            name: 'Developer',
            price: 'Free',
            features: ['1,000 requests / mo', 'Shared sandbox'],
            buttonText: 'Start Building',
            buttonVariant: 'secondary'
        },
        {
            name: 'Enterprise',
            price: '$299',
            period: '/mo',
            features: ['500,000 requests / mo', '24/7 Priority Support', 'Custom rate limits'],
            buttonText: 'Select Pro',
            buttonVariant: 'primary',
            isPopular: true
        },
        {
            name: 'Custom',
            price: 'Contact',
            features: ['Unlimited requests', 'On-prem deployment'],
            buttonText: 'Talk to Sales',
            buttonVariant: 'secondary'
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-10">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-6">
                    <div className="flex items-center gap-5">
                        {/* Logo Placeholder */}
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0">
                            <div className="w-6 h-6 border-4 border-gray-300 grid grid-cols-2 gap-1 rotate-45">
                                <div className="bg-gray-800 rounded-full w-1.5 h-1.5"></div>
                                <div className="bg-gray-800 rounded-full w-1.5 h-1.5"></div>
                                <div className="bg-gray-800 rounded-full w-1.5 h-1.5"></div>
                                <div className="bg-gray-800 rounded-full w-1.5 h-1.5"></div>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-3xl md:text-4xl font-light text-gray-200 mb-2">
                                {title}
                            </h1>
                            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-2">
                                <span>by <span className="text-gray-300">CogniStruct Systems</span></span>
                                <span className="text-gray-600">•</span>
                                <div className="flex items-center">
                                    <Star size={14} className="fill-current text-gray-500 mr-1" />
                                    <span>{rating} <span className="text-gray-500">({reviews} reviews)</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="bg-[#eef2f6] text-gray-900 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-white transition-colors">
                            View Documentation
                        </button>
                        <button className="text-gray-300 text-sm font-medium hover:text-white transition-colors">
                            Subscribe
                        </button>
                    </div>
                </header>

                {/* Navigation Tabs */}
                <div className="border-b border-white/10 mb-10 overflow-x-auto">
                    <ul className="flex space-x-8 min-w-max px-2">
                        {tabs.map((tab) => (
                            <li key={tab}>
                                <button
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 text-sm font-medium transition-colors border-b-2 ${activeTab === tab
                                        ? 'border-gray-300 text-gray-200'
                                        : 'border-transparent text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content Grid */}
              <div className="max-w-7xl mx-auto px-4 py-10">

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

    {/* LEFT COLUMN */}
    <div className="lg:col-span-2 space-y-6">

      {/* Description Card */}
      <div className="bg-white rounded-3xl p-8 text-gray-900">
        <h2 className="text-xl font-normal mb-4">
          {desc}
        </h2>

        <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
          The NeuralPath Vision Engine utilizes proprietary transformer-based architectures
          to analyze architectural schematic data.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'LATENCY', value: '142ms' },
            { label: 'UPTIME', value: '99.98%' },
            { label: 'VERSION', value: 'v2.4.0-stable' },
            { label: 'REGION', value: 'Global Edge' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#f8fafc] rounded-xl p-4 border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                {stat.label}
              </p>
              <p className="text-sm font-medium text-gray-800">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Code Card */}
     <div className="bg-[#e2e8f0] rounded-3xl p-8 text-gray-900">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
    <h3 className="text-sm font-medium text-gray-600">
      API Snippet
    </h3>

    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setActiveLang(lang)}
          className={`px-3 py-1 text-[11px] font-bold rounded-md ${
            activeLang === lang
              ? 'bg-white text-gray-800'
              : 'text-gray-500 hover:bg-white/50'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  </div>

  <div className="font-mono text-[13px] overflow-x-auto">
    <pre>
      <code>{codeSnippets[activeLang]}</code>
    </pre>
  </div>
</div>

    </div>

    {/* RIGHT SIDEBAR (STICKY) */}
    <div className="space-y-6 sticky top-6 self-start">

      <div className="bg-white rounded-3xl p-8">
        <h3 className="text-sm text-gray-500 mb-6">Provider Details</h3>
        <p className="text-sm text-gray-900 font-medium">CogniStruct Systems</p>
        <p className="text-sm text-gray-500">San Francisco, CA</p>
        <div className='flex flex-col  w-full  min-h-10 mt-3'>
            <div className='   w-full '> 
                <h1 className='text-sm text-gray-500'>Certified Partner Since 2021</h1>
            </div>
            <div className='   w-full my-2 flex gap-2'>
                <div className="elem w-fit px-2 py-1 bg-blue-300 text-xs text-white rounded-full">
                    <p className='uppercase'>top rated</p>
                </div>
                <div className="elem w-fit px-2 py-1 bg-pink-500 text-xs text-white rounded-full">
                    <p className='uppercase'>fast response</p>
                </div>
                
            </div>
        </div>
      </div>

      <div className="bg-[#f8fafc] rounded-3xl p-8">
        <h3 className="text-sm text-gray-500 mb-6">Service Status</h3>
        <table className="w-full  table-auto">
          
          <tbody>
            <tr>
              <td className="text-sm text-gray-900">API Gateway</td>
              <td className="text-right">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-800 bg-green-200 rounded-full">
                  Operational
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-sm text-gray-900">Latency</td>
              <td className="text-right">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs  leading-none text-gray-500 rounded-full">
                  142ms
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-sm text-gray-900">Success rate</td>
              <td className="text-right">
                <h1 className='text-gray-500 text-xs text-right px-2'>95%</h1>
              </td>
            </tr>
            <tr>
                <td className='pr-2  py-2 pb-2' colSpan={2}> 
                <div className='w-full rounded-full  bg-gray-300 h-1'>
                    <div style={{width:"95%"}} className=' bg-gray-600 rounded-full  h-full'>
                
                    </div>
                </div>
                </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>

</div>

                {/* Pricing Section */}
                <div>
                    <h2 className="text-xl font-light text-gray-300 mb-6">Scalable Pricing Plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingPlans.map((plan, idx) => (
                            <div key={idx} className="relative bg-white rounded-3xl p-8 text-gray-900 flex flex-col border border-gray-100">

                                {plan.isPopular && (
                                    <div className="absolute top-0 right-6 bg-black text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-b-lg">
                                        POPULAR
                                    </div>
                                )}

                                <h3 className="text-sm text-gray-500 font-medium mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                                    {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
                                </div>

                                <ul className="space-y-4 mb-10 grow">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start text-sm text-gray-600">
                                            <Check size={16} className="text-gray-400 mr-3 mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${plan.buttonVariant === 'primary'
                                        ? 'bg-black text-white hover:bg-gray-800'
                                        : 'bg-[#eef2f6] text-gray-800 hover:bg-gray-200'
                                        }`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default APIdetail;