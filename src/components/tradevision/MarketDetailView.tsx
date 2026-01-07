import React from 'react';
import { Icons } from './Icons';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { generateChartData } from '@/constants';

interface MarketDetailViewProps {
    symbol: string;
    onBack: () => void;
    onResearch: (symbol: string) => void;
}

const MarketDetailView: React.FC<MarketDetailViewProps> = ({ symbol, onBack, onResearch }) => {
    const chartData = generateChartData(500); // More data points for detailed view

    return (
        <div className="p-8 bg-[#f8f9fd] dark:bg-[#131722] h-full overflow-y-auto w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-full flex items-center justify-center hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] transition-colors"
                    >
                        <Icons.ChevronDown className="w-5 h-5 rotate-90 text-[#131722] dark:text-[#d1d4dc]" />
                    </button>
                    <div className="w-12 h-12 bg-[#ff9900]/10 rounded-full flex items-center justify-center">
                        {/* Mock Amazon Logo color/style */}
                        <span className="text-[#ff9900] font-bold text-xl">a</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#131722] dark:text-[#d1d4dc] flex items-center gap-2">
                            Amazone <span className="text-[#787b86] font-normal text-lg">(AMZ)</span>
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc]">$4.5</span>
                            <span className="text-sm font-bold text-[#00bfa5]">+ 201,01 ▲</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onResearch(symbol)}
                        className="px-6 py-2 bg-[#2962ff] text-white text-sm font-bold rounded-lg hover:bg-[#1e53e5] transition-colors"
                    >
                        Research
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Market Cap', val: '$ 112,893.00', trend: '70.5%' },
                    { label: 'Volume', val: '$ 112,893.00', trend: '70.5%' },
                    { label: 'Fully Diluted Market Cap', val: '$ 112,893.00', trend: '70.5%' },
                    { label: 'Circulating Supply', val: '$ 112,893.00', trend: '70.5%' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#1e222d] p-6 rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] shadow-sm">
                        <div className="text-xs text-[#787b86] mb-2">{stat.label}</div>
                        <div className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc] mb-1">{stat.val}</div>
                        <div className="text-xs font-bold text-[#00bfa5]">trend title ▲ {stat.trend}</div>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white dark:bg-[#1e222d] p-8 rounded-3xl shadow-sm border border-[#e0e3eb] dark:border-[#2a2e39]">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-[#787b86]">Chart</h2>
                        <div className="flex bg-[#f8f9fd] dark:bg-[#2a2e39] rounded-lg p-1">
                            <button className="px-3 py-1 bg-white dark:bg-[#1e222d] rounded text-xs font-bold text-[#131722] dark:text-[#d1d4dc] shadow-sm">Price</button>
                            <button className="px-3 py-1 text-xs font-medium text-[#787b86]">Market Cap</button>
                            <button className="px-3 py-1 text-xs font-medium text-[#787b86]">Candle Chart</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-medium text-[#131722] dark:text-[#d1d4dc]">Stats</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-[#e0e3eb] dark:border-[#2a2e39] rounded text-xs font-medium text-[#787b86]">Years ∨</button>
                            <button className="px-3 py-1 border border-[#e0e3eb] dark:border-[#2a2e39] rounded text-xs font-medium text-[#787b86]">Aug 20th - Dec 4th ∨</button>
                            <span className="text-xs text-[#787b86] flex items-center">compared to</span>
                            <button className="px-3 py-1 border border-[#e0e3eb] dark:border-[#2a2e39] rounded text-xs font-medium text-[#787b86]">Previous ∨</button>
                            <button className="px-3 py-1 border border-[#e0e3eb] dark:border-[#2a2e39] rounded text-xs font-medium text-[#787b86]">2024 ∨</button>
                        </div>
                    </div>
                </div>

                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00bfa5" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#00bfa5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#787b86', fontSize: 12 }}
                                tickFormatter={(val) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][val % 12]}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#787b86', fontSize: 12 }}
                                domain={['auto', 'auto']}
                                tickFormatter={(val) => `$${val}`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#00bfa5"
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default MarketDetailView;
