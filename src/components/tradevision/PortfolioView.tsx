import React from 'react';
import { Icons } from './Icons';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data
const PORTFOLIO_CARDS = [
    { id: 1, name: 'Adobe', icon: 'adobe', share: '+ 201,01', return: '$ 201,01', chartColor: '#00bfa5', data: [10, 15, 12, 18, 15, 20, 18, 24] },
    { id: 2, name: 'Adobe', icon: 'dobe-orange', share: '+ 201,01', return: '$ 201,01', chartColor: '#f23645', data: [24, 20, 22, 18, 20, 15, 12, 10] },
    { id: 3, name: 'Adobe', icon: 'adobe-blue', share: '+ 201,01', return: '$ 201,01', chartColor: '#00bfa5', data: [12, 14, 13, 16, 18, 16, 22, 21] },
    { id: 4, name: 'Adobe', icon: 'adobe-outline', share: '+ 201,01', return: '$ 201,01', chartColor: '#f23645', data: [20, 18, 16, 19, 15, 14, 12, 16] },
];

const FAVORITES = [
    { id: 1, name: 'Adobe', symbol: 'Adobe', price: '201,01', change: '- 201,01', isPositive: false },
    { id: 2, name: 'Adobe', symbol: 'Adobe', price: '201,01', change: '- 201,01', isPositive: false },
    { id: 3, name: 'Adobe', symbol: 'Adobe', price: '201,01', change: '- 201,01', isPositive: false },
    { id: 4, name: 'Adobe', symbol: 'Adobe', price: '201,01', change: '- 201,01', isPositive: false },
    { id: 5, name: 'Adobe', symbol: 'Adobe', price: '201,01', change: '- 201,01', isPositive: false },
];

const MARKET_TRENDS = [
    { id: 1, symbol: 'AAPL', name: 'Apple Inc', price: '201,01', balance: '- 201,01', value: '$ 201,01', isPositive: false },
    { id: 2, symbol: 'AAPL', name: 'Apple Inc', price: '201,01', balance: '- 201,01', value: '$ 201,01', isPositive: false },
    { id: 3, symbol: 'AAPL', name: 'Apple Inc', price: '201,01', balance: '- 201,01', value: '$ 201,01', isPositive: false },
    { id: 4, symbol: 'AAPL', name: 'Apple Inc', price: '201,01', balance: '- 201,01', value: '$ 201,01', isPositive: false },
    { id: 5, symbol: 'AAPL', name: 'Apple Inc', price: '201,01', balance: '- 201,01', value: '$ 201,01', isPositive: false },
];

const CHART_DATA = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    value: Math.random() * 2000 + 1500 + (Math.sin(i / 5) * 1000)
}));


const PortfolioView: React.FC = () => {
    return (
        <div className="p-6 bg-[#f8f9fd] dark:bg-[#131722] h-full overflow-y-auto">
            <h1 className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc] mb-6">My Portofolio</h1>

            {/* Top Cards Carousel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {PORTFOLIO_CARDS.map(card => (
                    <div key={card.id} className="bg-white dark:bg-[#1e222d] rounded-xl p-4 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                            {/* Mock Icons */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                ${card.id === 1 ? 'bg-red-500/10 text-red-600' :
                                    card.id === 2 ? 'bg-orange-500/10 text-orange-600' :
                                        card.id === 3 ? 'bg-blue-600/10 text-blue-600' : 'bg-red-500/10 text-red-600 border border-red-500'}`}>
                                <span className="font-bold text-xs">A</span>
                            </div>
                            <span className="font-bold text-[#131722] dark:text-[#d1d4dc]">{card.name}</span>
                        </div>

                        {/* Mini Chart */}
                        <div className="absolute top-4 right-4 w-16 h-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={card.data.map((v, i) => ({ v, i }))}>
                                    <Area type="monotone" dataKey="v" stroke={card.chartColor} fill="none" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-[#787b86]">Total Share</span>
                                <span className="text-[#00bfa5] font-bold">{card.share} ▲</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#787b86]">Total Return</span>
                                <span className="text-[#131722] dark:text-[#d1d4dc] font-bold">{card.return}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-6 mb-6">
                {/* Main Chart Section */}
                <div className="col-span-12 lg:col-span-8 bg-white dark:bg-[#1e222d] rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                                <span className="text-orange-500 font-bold text-lg">a</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc]">Amazone</h2>
                                <span className="text-sm text-[#787b86]">AMZ</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-[#131722] dark:text-[#d1d4dc]">$ 201,01</div>
                            <div className="text-xs text-[#00bfa5] font-bold">trend title ▲ 70.5% <span className="text-[#787b86] font-normal">Last update 15.40</span></div>
                        </div>
                    </div>

                    {/* Time Tabs */}
                    <div className="flex gap-2 mb-6">
                        {['1 Day', '1 Week', '1 Month', '3 Month', '6 Month', '1 Years', '3 Years', 'ALL'].map((t, i) => (
                            <button key={t} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${i === 0 ? 'bg-[#131722] text-white dark:bg-white dark:text-[#131722]' : 'border border-[#e0e3eb] dark:border-[#2a2e39] text-[#787b86] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'}`}>
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={CHART_DATA}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00bfa5" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#00bfa5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" hide />
                                <YAxis hide domain={['auto', 'auto']} />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#00bfa5" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Favorites Sidebar */}
                <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#1e222d] rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-[#131722] dark:text-[#d1d4dc]">My Favorite</h3>
                        <button className="text-xs text-[#2962ff] font-medium hover:underline">See All</button>
                    </div>
                    <div className="space-y-4">
                        {FAVORITES.map((fav, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-[#f0f3fa] dark:border-[#2a2e39] last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                        ${i === 0 ? 'bg-orange-100 text-orange-600' :
                                            i === 1 ? 'bg-red-100 text-red-600' :
                                                i === 2 ? 'bg-blue-100 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                        <span className="font-bold text-xs">{fav.name[0]}</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">{fav.name}</div>
                                        <div className="text-xs text-[#787b86]">{fav.symbol}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">$ {fav.price}</div>
                                    <div className="text-xs font-bold text-[#f23645]">{fav.change} ▼</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Market Trend */}
            <div className="bg-white dark:bg-[#1e222d] rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-[#131722] dark:text-[#d1d4dc]">Market Trend</h3>
                    <button className="text-xs text-[#2962ff] font-medium hover:underline">See All</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs text-[#787b86] border-b border-[#f0f3fa] dark:border-[#2a2e39]">
                                <th className="text-left py-3 font-normal">Name</th>
                                <th className="text-left py-3 font-normal">Price</th>
                                <th className="text-left py-3 font-normal">Balance</th>
                                <th className="text-left py-3 font-normal">Value</th>
                                <th className="text-center py-3 font-normal">Watchlist</th>
                                <th className="text-right py-3 font-normal"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39]">
                            {MARKET_TRENDS.map((item, i) => (
                                <tr key={i} className="group hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50 transition-colors">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                                ${i % 5 === 0 ? 'bg-blue-100 text-blue-600' :
                                                    i % 5 === 1 ? 'bg-red-100 text-red-600' :
                                                        i % 5 === 2 ? 'bg-orange-100 text-orange-600' :
                                                            i % 5 === 3 ? 'bg-yellow-100 text-yellow-600' : 'bg-cyan-100 text-cyan-600'}`}>
                                                <Icons.Activity className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">{item.symbol}</div>
                                                <div className="text-xs text-[#787b86]">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">$ {item.price}</td>
                                    <td className="py-4 text-sm font-bold text-[#f23645]">{item.balance} ▼</td>
                                    <td className="py-4 text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">{item.value}</td>
                                    <td className="py-4 text-center">
                                        <button className="text-[#787b86] hover:text-[#2962ff]">
                                            <Icons.Bookmark className="w-4 h-4" />
                                        </button>
                                    </td>
                                    <td className="py-4 text-right">
                                        <button className="bg-[#2962ff] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#1e53e5] transition-colors">
                                            Get Started
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PortfolioView;
