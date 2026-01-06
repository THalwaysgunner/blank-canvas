import React, { useState } from 'react';
import { Icons } from './Icons';
import { MOCK_STOCKS } from '@/constants';

type TabKey = 'summary' | 'managements' | 'financial' | 'evaluation' | 'insights' | 'financial-variables';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'summary', label: 'Summary' },
  { key: 'managements', label: 'Managements' },
  { key: 'financial', label: 'Financial' },
  { key: 'evaluation', label: 'Evaluation' },
  { key: 'insights', label: 'Insights' },
  { key: 'financial-variables', label: 'Financial Variables' },
];

const MyResearchesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('summary');
  const [selectedStock, setSelectedStock] = useState<string | null>(MOCK_STOCKS[0]?.symbol || null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fd] dark:bg-[#131722]">
      {/* Watchlist Section */}
      <div className="p-6 border-b border-[#e0e3eb] dark:border-[#2a2e39]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#131722] dark:text-[#e0e3eb]">Watchlist</h1>
            <p className="text-sm text-[#787b86]">
              Updated {new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })} at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#2962ff] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1e53e5] transition-colors">
            <Icons.Plus className="w-4 h-4" />
            Watchlist
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#787b86]">Watchlist</span>
            <Icons.ChevronDown className="w-4 h-4 text-[#787b86]" />
          </div>
          <button className="p-2 hover:bg-[#e0e3eb] dark:hover:bg-[#2a2e39] rounded transition-colors">
            <Icons.Plus className="w-4 h-4 text-[#787b86]" />
          </button>
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#787b86]" />
              <input
                type="text"
                placeholder="Input search text"
                className="w-full bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-md pl-10 pr-4 py-2 text-sm text-[#131722] dark:text-[#d1d4dc] placeholder-[#787b86] focus:outline-none focus:border-[#2962ff]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#787b86] uppercase tracking-wider">Stock Name</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#787b86] uppercase tracking-wider">Price</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#787b86] uppercase tracking-wider">Value</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#787b86] uppercase tracking-wider">Balance</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#787b86] uppercase tracking-wider">Chart</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#787b86] uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STOCKS.map((stock, index) => (
                <tr
                  key={stock.symbol}
                  onClick={() => setSelectedStock(stock.symbol)}
                  className={`border-b border-[#e0e3eb] dark:border-[#2a2e39] last:border-0 cursor-pointer transition-colors
                    ${selectedStock === stock.symbol 
                      ? 'bg-[#2962ff]/10 dark:bg-[#2962ff]/20' 
                      : 'hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs
                        ${index % 5 === 0 ? 'bg-gray-800' : 
                          index % 5 === 1 ? 'bg-amber-500' : 
                          index % 5 === 2 ? 'bg-red-500' : 
                          index % 5 === 3 ? 'bg-blue-500' : 'bg-cyan-500'}`}>
                        {stock.symbol.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-[#131722] dark:text-[#d1d4dc]">{stock.symbol}</span>
                        <span className="text-[#787b86] text-sm ml-2">{stock.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-[#131722] dark:text-[#d1d4dc]">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td className={`px-4 py-3 text-right text-sm font-medium ${stock.change >= 0 ? 'text-[#00bfa5]' : 'text-[#f23645]'}`}>
                    {stock.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-[#131722] dark:text-[#d1d4dc]">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <MiniChart positive={stock.change >= 0} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="bg-[#2962ff] text-white text-xs font-medium px-4 py-1.5 rounded hover:bg-[#1e53e5] transition-colors">
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <div className="border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#1e222d]">
        <div className="flex overflow-x-auto px-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${activeTab === tab.key
                  ? 'border-[#2962ff] text-[#2962ff]'
                  : 'border-transparent text-[#787b86] hover:text-[#131722] dark:hover:text-[#d1d4dc]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] p-8 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <Icons.FileText className="w-12 h-12 text-[#787b86] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#131722] dark:text-[#d1d4dc] mb-2">
              {TABS.find(t => t.key === activeTab)?.label}
            </h3>
            <p className="text-sm text-[#787b86]">
              {selectedStock ? `Data for ${selectedStock} will appear here` : 'Select a stock to view details'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mini sparkline chart
const MiniChart: React.FC<{ positive: boolean }> = ({ positive }) => {
  const points = Array.from({ length: 12 }, (_, i) => {
    const baseY = 15;
    const variance = Math.sin(i * 0.8) * 8 + Math.random() * 4;
    return positive ? baseY - variance : baseY + variance;
  });

  const pathD = points.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * 6} ${y}`).join(' ');

  return (
    <svg width="72" height="30" className="mx-auto">
      <path
        d={pathD}
        fill="none"
        stroke={positive ? '#00bfa5' : '#f23645'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MyResearchesView;
