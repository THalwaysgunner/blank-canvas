import React, { useState } from 'react';
import { Icons } from './Icons';
import { MOCK_STOCKS } from '@/constants';

interface MarketsViewProps {
    onStockClick: (symbol: string) => void;
}

const CATEGORIES = [
    'Finance Service', 'Energy', 'Materials', 'Technology', 'Consumer Staples',
    'Media', 'Industrials', 'Healthcare'
];

const MarketsView: React.FC<MarketsViewProps> = ({ onStockClick }) => {
    const [selectedCategory, setSelectedCategory] = useState('Energy');

    return (
        <div className="p-8 bg-[#f8f9fd] dark:bg-[#131722] h-full overflow-y-auto w-full">
            <h1 className="text-2xl font-bold text-[#131722] dark:text-[#d1d4dc] mb-2">Stock</h1>
            <h2 className="text-lg font-semibold text-[#131722] dark:text-[#d1d4dc] mb-6">Stock Market</h2>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-8">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors
                            ${selectedCategory === cat
                                ? 'bg-[#131722] text-white border-[#131722] dark:bg-white dark:text-[#131722]'
                                : 'bg-white dark:bg-[#1e222d] text-[#131722] dark:text-[#d1d4dc] border-[#e0e3eb] dark:border-[#2a2e39] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Stock Table */}
            <div className="bg-white dark:bg-[#1e222d] rounded-xl shadow-sm border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs text-[#787b86] border-b border-[#f0f3fa] dark:border-[#2a2e39]">
                                <th className="text-left py-4 px-6 font-normal">Name</th>
                                <th className="text-left py-4 px-6 font-normal">Price</th>
                                <th className="text-left py-4 px-6 font-normal">Value</th>
                                <th className="text-left py-4 px-6 font-normal">Balance</th>
                                <th className="text-center py-4 px-6 font-normal">Watchlist</th>
                                <th className="text-right py-4 px-6 font-normal"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39]">
                            {MOCK_STOCKS.map((stock, i) => (
                                <tr
                                    key={stock.symbol}
                                    className="group hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50 transition-colors cursor-pointer"
                                    onClick={() => onStockClick(stock.symbol)}
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                                ${i % 4 === 0 ? 'bg-blue-100 text-blue-600' :
                                                    i % 4 === 1 ? 'bg-orange-100 text-orange-600' :
                                                        i % 4 === 2 ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                                                {/* Mock Logo/Icon */}
                                                <Icons.Activity className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">{stock.symbol}</div>
                                                <div className="text-xs text-[#787b86]">{stock.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">
                                        $ {stock.price.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className={`text-sm font-bold ${stock.change >= 0 ? 'text-[#00bfa5]' : 'text-[#f23645]'}`}>
                                            {stock.change >= 0 ? '+' : '-'} {Math.abs(stock.change).toFixed(2)}
                                            <span className="ml-1 text-[10px] align-top">▼</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">
                                        $ {stock.price.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button className="text-[#787b86] hover:text-[#2962ff]">
                                            <Icons.Bookmark className="w-5 h-5" />
                                        </button>
                                    </td>
                                    <td className="py-4 px-6 text-right">
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

export default MarketsView;
