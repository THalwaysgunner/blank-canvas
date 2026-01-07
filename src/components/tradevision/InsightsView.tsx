import React from 'react';
import { Icons } from './Icons';

const InsightsView: React.FC = () => {
    // Mock data mimicking an admin/system posted insight
    const insight = {
        title: "Apple Inc: Ecosystem Expansion Driving Services Growth",
        author: "TradeVision Research Team",
        date: "Jan 7, 2026",
        recommendation: "BUY",
        priceTarget: 250.00,
        tags: ["Growth", "Tech", "AI"],
        content: [
            "Apple continues to demonstrate strong ecosystem stickiness and service revenue growth. The recent product launches indicate a continued focus on integrating AI across the entire hardware lineup, which we believe will drive a significant upgrade cycle.",
            "Key drivers include the new Vision product line which, while currently niche, represents a new platform for spatial computing. Services revenue has compounded at 15% annually, providing a stable high-margin floor to earnings.",
            "Risks remain with regulatory headwinds in the EU and potential slowdowns in China, but the company's capital return program remains best-in-class."
        ]
    };

    return (
        <div className="space-y-6 text-[#131722] dark:text-[#d1d4dc]">
            {/* Header Section */}
            <div className="flex items-start justify-between border-b border-[#e0e3eb] dark:border-[#2a2e39] pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#2962ff]/10 text-[#2962ff] px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                            Latest Research
                        </span>
                        <span className="text-xs text-[#787b86]">{insight.date} • By {insight.author}</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-4">{insight.title}</h1>
                    <div className="flex gap-2">
                        {insight.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#787b86] text-xs font-medium rounded">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Save/Share Actions */}
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] rounded text-[#787b86]">
                        <Icons.Printer className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] rounded text-[#787b86]">
                        <Icons.Check className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                        {insight.content.map((paragraph, idx) => (
                            <p key={idx} className="text-base leading-relaxed text-[#131722] dark:text-[#d1d4dc] mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Mock Chart/Image Placeholder */}
                    <div className="bg-[#f8f9fd] dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center">
                            <Icons.ExampleChart className="w-12 h-12 text-[#2962ff] mx-auto mb-2 opacity-50" />
                            <span className="text-sm text-[#787b86]">Services Revenue Growth Chart</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Summary */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Recommendation Card */}
                    <div className="bg-white dark:bg-[#1e222d] rounded-lg p-6 shadow-sm">
                        <div className="text-xs text-[#787b86] font-bold uppercase tracking-wider mb-4">Analyst Rating</div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="text-center w-full">
                                <div className="text-3xl font-bold text-[#00bfa5] mb-1">{insight.recommendation}</div>
                                <div className="text-xs text-[#787b86]">Recommendation</div>
                            </div>
                            <div className="w-px h-12 bg-[#e0e3eb] dark:bg-[#2a2e39]"></div>
                            <div className="text-center w-full">
                                <div className="text-3xl font-bold text-[#131722] dark:text-[#e0e3eb] mb-1">${insight.priceTarget}</div>
                                <div className="text-xs text-[#787b86]">Price Target</div>
                            </div>
                        </div>

                        <button className="w-full py-2 bg-[#2962ff] hover:bg-[#1e53e5] text-white font-medium rounded transition-colors text-sm">
                            View Full Report PDF
                        </button>
                    </div>

                    {/* Key Takeaways */}
                    <div className="bg-[#f0f3fa] dark:bg-[#2a2e39]/30 rounded-lg p-6">
                        <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <Icons.Info className="w-4 h-4 text-[#2962ff]" />
                            Key Takeaways
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-[#131722] dark:text-[#d1d4dc] flex gap-2">
                                <span className="text-[#2962ff] mt-1">•</span>
                                Services revenue compounding at 15%
                            </li>
                            <li className="text-sm text-[#131722] dark:text-[#d1d4dc] flex gap-2">
                                <span className="text-[#2962ff] mt-1">•</span>
                                AI integration to drive hardware upgrades
                            </li>
                            <li className="text-sm text-[#131722] dark:text-[#d1d4dc] flex gap-2">
                                <span className="text-[#2962ff] mt-1">•</span>
                                Robust capital return program
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsView;
