import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { analyzeMarketTrend, analyzeStockDeepDive } from '@/services/geminiService';
import { AIAnalysisResult } from '@/types';
import { MOCK_STOCKS } from '@/constants';

const ResearchSection: React.FC = () => {
    const [query, setQuery] = useState('');
    const [generalAnalysis, setGeneralAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStock, setSelectedStock] = useState<string>('AAPL');
    const [stockAnalysis, setStockAnalysis] = useState<AIAnalysisResult | null>(null);
    const [isStockLoading, setIsStockLoading] = useState(false);

    useEffect(() => {
        handleAnalyzeStock(selectedStock);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGeneralSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsLoading(true);
        const result = await analyzeMarketTrend(query);
        setGeneralAnalysis(result);
        setIsLoading(false);
    };

    const handleAnalyzeStock = async (symbol: string) => {
        setIsStockLoading(true);
        setSelectedStock(symbol);
        const result = await analyzeStockDeepDive(symbol);
        setStockAnalysis(result);
        setIsStockLoading(false);
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#f8f9fd] dark:bg-[#131722] overflow-hidden">

            {/* Top Bar / Ticker Selector */}
            <div className="flex-none h-[50px] border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#131722] flex items-center px-4 overflow-x-auto">
                <span className="text-xs font-bold text-[#787b86] uppercase mr-4 tracking-wider">Research Targets:</span>
                <div className="flex gap-2">
                    {MOCK_STOCKS.map(stock => (
                        <button
                            key={stock.symbol}
                            onClick={() => handleAnalyzeStock(stock.symbol)}
                            className={`px-3 py-1 text-xs font-semibold border rounded-sm transition-all whitespace-nowrap ${selectedStock === stock.symbol
                                    ? 'bg-[#2962ff] border-[#2962ff] text-white'
                                    : 'bg-transparent border-[#e0e3eb] dark:border-[#2a2e39] text-[#131722] dark:text-[#d1d4dc] hover:bg-[#e0e3eb] dark:hover:bg-[#2a2e39]'
                                }`}
                        >
                            {stock.symbol}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">

                {/* Left Panel: Deep Dive Analysis */}
                <div className="flex-1 flex flex-col min-w-0 border-r border-[#e0e3eb] dark:border-[#2a2e39] overflow-y-auto">
                    <div className="p-6">
                        {isStockLoading ? (
                            <div className="h-full flex flex-col items-center justify-center text-[#787b86] gap-3 py-20">
                                <div className="w-6 h-6 border-2 border-[#2962ff] border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs uppercase tracking-wide">Analysing {selectedStock}...</span>
                            </div>
                        ) : stockAnalysis ? (
                            <div className="animate-in fade-in duration-300">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#131722] dark:text-[#d1d4dc] mb-1">{selectedStock} Analysis</h2>
                                        <div className="text-sm text-[#787b86]">Gemini-Pro 1.5 Generated Report</div>
                                    </div>
                                    <div className={`px-4 py-2 text-sm font-bold rounded-sm border ${stockAnalysis.rating.includes('Buy') ? 'border-[#00bfa5] text-[#00bfa5] bg-[#00bfa5]/10' :
                                            stockAnalysis.rating.includes('Sell') ? 'border-[#f23645] text-[#f23645] bg-[#f23645]/10' :
                                                'border-[#d1d4dc] text-[#d1d4dc]'
                                        }`}>
                                        {stockAnalysis.rating.toUpperCase()}
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-4 rounded-sm mb-6">
                                    <p className="text-sm leading-relaxed text-[#131722] dark:text-[#d1d4dc]">{stockAnalysis.summary}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border border-[#00bfa5]/30 bg-[#00bfa5]/5 p-4 rounded-sm">
                                        <h3 className="text-sm font-bold text-[#00bfa5] mb-3 flex items-center gap-2">
                                            <Icons.TrendingUp className="w-4 h-4" /> BULL THESIS
                                        </h3>
                                        <ul className="space-y-2">
                                            {stockAnalysis.bullCase.map((item, i) => (
                                                <li key={i} className="text-xs text-[#131722] dark:text-[#d1d4dc] flex items-start gap-2">
                                                    <span className="mt-1 w-1 h-1 bg-[#00bfa5] rounded-full flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="border border-[#f23645]/30 bg-[#f23645]/5 p-4 rounded-sm">
                                        <h3 className="text-sm font-bold text-[#f23645] mb-3 flex items-center gap-2">
                                            <Icons.TrendingDown className="w-4 h-4" /> BEAR THESIS
                                        </h3>
                                        <ul className="space-y-2">
                                            {stockAnalysis.bearCase.map((item, i) => (
                                                <li key={i} className="text-xs text-[#131722] dark:text-[#d1d4dc] flex items-start gap-2">
                                                    <span className="mt-1 w-1 h-1 bg-[#f23645] rounded-full flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Right Panel: AI Chat Analyst */}
                <div className="w-full lg:w-[400px] bg-white dark:bg-[#1e222d] flex flex-col h-[500px] lg:h-auto border-t lg:border-t-0 lg:border-l border-[#e0e3eb] dark:border-[#2a2e39]">
                    <div className="p-3 border-b border-[#e0e3eb] dark:border-[#2a2e39] flex items-center gap-2 bg-[#f8f9fd] dark:bg-[#131722]">
                        <Icons.AI className="w-4 h-4 text-[#2962ff]" />
                        <span className="text-xs font-bold uppercase tracking-wide text-[#787b86]">Market Intelligence</span>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                        {!generalAnalysis && (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                                <Icons.AI className="w-12 h-12 mb-2 text-[#787b86]" />
                                <p className="text-sm text-[#787b86]">Ask me about market conditions,<br />sectors, or macro economics.</p>
                            </div>
                        )}
                        {generalAnalysis && (
                            <div className="flex gap-3 animate-in slide-in-from-bottom-2 duration-300">
                                <div className="w-8 h-8 rounded bg-[#2962ff] flex-shrink-0 flex items-center justify-center">
                                    <Icons.AI className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-[#787b86] mb-1">TradeVision AI</div>
                                    <div className="text-sm text-[#131722] dark:text-[#d1d4dc] leading-relaxed whitespace-pre-wrap">
                                        {generalAnalysis}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-[#e0e3eb] dark:border-[#2a2e39] bg-[#f8f9fd] dark:bg-[#131722]">
                        <form onSubmit={handleGeneralSubmit} className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ask a question..."
                                className="w-full bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded text-sm px-3 py-2 pr-10 focus:outline-none focus:border-[#2962ff] text-[#131722] dark:text-[#d1d4dc]"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-1 top-1 p-1 text-[#2962ff] hover:bg-[#2962ff]/10 rounded disabled:opacity-50"
                            >
                                {isLoading ? <div className="w-4 h-4 border-2 border-[#2962ff] border-t-transparent rounded-full animate-spin" /> : <Icons.ArrowRight className="w-4 h-4" />}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResearchSection;
