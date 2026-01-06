import React, { useState } from 'react';
import { Icons } from './Icons';
import { analyzeMarketTrend, analyzeStockDeepDive } from '@/services/geminiService';
import { AIAnalysisResult } from '@/types';
import StockSearch from './StockSearch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Stock {
    id: number;
    symbol: string;
    company_name: string;
}

interface StockMetrics {
    dayRange: { low: number; high: number; current: number };
    weekRange52: { low: number; high: number };
    previousClose: number;
    averageVolume: string;
    marketCap: string;
    sharesOutstanding: string;
    eps: number;
    peRatio: number | null;
    fwdDividend: number | null;
    exDividendDate: string | null;
}

interface AIInsight {
    type: 'positive' | 'negative' | 'neutral';
    text: string;
    expandable?: boolean;
}

interface RadarMetrics {
    valuation: number;
    health: number;
    earnings: number;
    growth: number;
    performance: number;
}

interface AnalystData {
    rating: string;
    count: number;
    targetPrice: number;
    forecast: 'Up' | 'Down' | 'Neutral';
    nextQuarter: string;
    topSeller?: string;
    topSellerChange?: string;
}

interface ForumPost {
    id: string;
    author: string;
    time: string;
    title: string;
    content: string;
    likes: number;
    replies: number;
}

// Mock data generators
const generateMockMetrics = (symbol: string): StockMetrics => ({
    dayRange: { low: 28.73, high: 32.38, current: 31.52 },
    weekRange52: { low: 16.38, high: 38.45 },
    previousClose: 28.45,
    averageVolume: '1.86M',
    marketCap: '5.83B',
    sharesOutstanding: '185.12M',
    eps: -0.15,
    peRatio: null,
    fwdDividend: null,
    exDividendDate: null,
});

const generateMockAIInsights = (): AIInsight[] => [
    { type: 'positive', text: 'EPS YoY grew better than peers', expandable: true },
    { type: 'negative', text: 'P/S multiple below industry average', expandable: true },
    { type: 'positive', text: 'Analysts forecast more than 20% upside for 12-month price target', expandable: true },
    { type: 'positive', text: 'EPS has grown QoQ', expandable: true },
    { type: 'negative', text: 'Revenue grew worse than peers', expandable: true },
    { type: 'positive', text: 'EPS YoY forecast is above industry average', expandable: true },
];

const generateMockRadarMetrics = (): RadarMetrics => ({
    valuation: 4,
    health: 3,
    earnings: 5,
    growth: 1,
    performance: 1,
});

const generateMockAnalystData = (): AnalystData => ({
    rating: 'Strong Buy',
    count: 12,
    targetPrice: 38.42,
    forecast: 'Up',
    nextQuarter: 'Next quarter',
    topSeller: 'Bank Of Am...',
    topSellerChange: '-72.95% shares',
});

const generateMockTopStories = () => [
    {
        id: '1',
        source: 'StarsInsider',
        time: '3 hr. ago',
        title: 'How the British royal family makes money',
        summary: 'The British royal family is known for their immense wealth...',
    },
    {
        id: '2',
        source: 'StarsInsider',
        time: '23 hr. ago',
        title: 'Mickey Rourke turns to fundraiser to pay his rent',
        summary: 'A fundraiser was launched on January 4 to cover expenses...',
    },
    {
        id: '3',
        source: 'Daily Mail',
        time: '3 days ago',
        title: 'Canadian snowbirds flocking to sell their Florida homes',
        summary: 'Homes amid Trump feud face huge losses...',
    },
];

const generateMockForumPosts = (): ForumPost[] => [
    {
        id: '1',
        author: 'TraderJoe123',
        time: '2 hours ago',
        title: 'Technical analysis shows strong support at $28',
        content: 'Looking at the charts, we have solid support forming around the $28 level. RSI is oversold and MACD showing potential bullish crossover...',
        likes: 24,
        replies: 8,
    },
    {
        id: '2',
        author: 'ValueInvestor',
        time: '5 hours ago',
        title: 'Q4 earnings expectations',
        content: 'Based on recent guidance, I expect earnings to beat consensus. The semiconductor cycle is turning and this company is well positioned...',
        likes: 42,
        replies: 15,
    },
    {
        id: '3',
        author: 'ChartMaster',
        time: '1 day ago',
        title: 'Cup and handle pattern forming?',
        content: 'Anyone else seeing this cup and handle on the weekly? If confirmed, this could signal a breakout to new highs...',
        likes: 18,
        replies: 6,
    },
];

// Radar Chart Component
const RadarChart: React.FC<{ metrics: RadarMetrics }> = ({ metrics }) => {
    const centerX = 100;
    const centerY = 100;
    const maxRadius = 70;

    const labels = [
        { key: 'valuation', label: 'Valuation', angle: -90 },
        { key: 'health', label: 'Health', angle: -18 },
        { key: 'earnings', label: 'Earnings', angle: 54 },
        { key: 'growth', label: 'Growth', angle: 126 },
        { key: 'performance', label: 'Performance', angle: 198 },
    ];

    const getPoint = (angle: number, value: number) => {
        const radians = (angle * Math.PI) / 180;
        const radius = (value / 6) * maxRadius;
        return {
            x: centerX + radius * Math.cos(radians),
            y: centerY + radius * Math.sin(radians),
        };
    };

    const polygonPoints = labels
        .map(({ key, angle }) => {
            const value = metrics[key as keyof RadarMetrics];
            const point = getPoint(angle, value);
            return `${point.x},${point.y}`;
        })
        .join(' ');

    return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background circles */}
            {[1, 2, 3, 4, 5, 6].map((level) => (
                <circle
                    key={level}
                    cx={centerX}
                    cy={centerY}
                    r={(level / 6) * maxRadius}
                    fill="none"
                    stroke="currentColor"
                    className="text-[#e0e3eb] dark:text-[#2a2e39]"
                    strokeWidth="1"
                />
            ))}

            {/* Axis lines */}
            {labels.map(({ angle }) => {
                const point = getPoint(angle, 6);
                return (
                    <line
                        key={angle}
                        x1={centerX}
                        y1={centerY}
                        x2={point.x}
                        y2={point.y}
                        stroke="currentColor"
                        className="text-[#e0e3eb] dark:text-[#2a2e39]"
                        strokeWidth="1"
                    />
                );
            })}

            {/* Data polygon */}
            <polygon
                points={polygonPoints}
                fill="rgba(41, 98, 255, 0.2)"
                stroke="#2962ff"
                strokeWidth="2"
            />

            {/* Labels */}
            {labels.map(({ key, label, angle }) => {
                const value = metrics[key as keyof RadarMetrics];
                const labelPoint = getPoint(angle, 7.5);
                return (
                    <g key={key}>
                        <text
                            x={labelPoint.x}
                            y={labelPoint.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[10px] fill-[#787b86]"
                        >
                            {label}
                        </text>
                        <text
                            x={labelPoint.x}
                            y={labelPoint.y + 12}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[10px] font-bold fill-[#2962ff]"
                        >
                            {value}/6
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

// Range Bar Component
const RangeBar: React.FC<{ low: number; high: number; current: number; label: string }> = ({ low, high, current, label }) => {
    const percentage = ((current - low) / (high - low)) * 100;
    return (
        <div className="mb-3">
            <div className="flex justify-between text-xs text-[#787b86] mb-1">
                <span>{label}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-xs text-[#787b86] w-12">{low.toFixed(2)}</span>
                <div className="flex-1 h-1 bg-[#e0e3eb] dark:bg-[#2a2e39] rounded-full relative">
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2962ff] rounded-full"
                        style={{ left: `${percentage}%` }}
                    />
                </div>
                <span className="text-xs text-[#787b86] w-12 text-right">{high.toFixed(2)}</span>
            </div>
        </div>
    );
};

const ResearchSection: React.FC = () => {
    const [query, setQuery] = useState('');
    const [generalAnalysis, setGeneralAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [stockAnalysis, setStockAnalysis] = useState<AIAnalysisResult | null>(null);
    const [isStockLoading, setIsStockLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('summary');

    // Mock data state
    const [metrics] = useState<StockMetrics>(generateMockMetrics(''));
    const [aiInsights] = useState<AIInsight[]>(generateMockAIInsights());
    const [radarMetrics] = useState<RadarMetrics>(generateMockRadarMetrics());
    const [analystData] = useState<AnalystData>(generateMockAnalystData());
    const [topStories] = useState(generateMockTopStories());
    const [forumPosts] = useState<ForumPost[]>(generateMockForumPosts());

    const handleGeneralSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsLoading(true);
        const result = await analyzeMarketTrend(query);
        setGeneralAnalysis(result);
        setIsLoading(false);
    };

    const handleAnalyzeStock = async (stock: Stock) => {
        setSelectedStock(stock);
        setIsStockLoading(true);
        const result = await analyzeStockDeepDive(stock.symbol);
        setStockAnalysis(result);
        setIsStockLoading(false);
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#f8f9fd] dark:bg-[#131722] overflow-hidden">

            {/* Top Bar / Stock Search */}
            <div className="flex-none h-[60px] border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#131722] flex items-center px-4 gap-4">
                <span className="text-xs font-bold text-[#787b86] uppercase tracking-wider shrink-0">Research Target:</span>
                <StockSearch
                    className="flex-1 max-w-md"
                    placeholder="Search for a stock to analyze..."
                    onSelect={handleAnalyzeStock}
                />
                {selectedStock && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2962ff]/10 border border-[#2962ff]/30 rounded-md">
                        <span className="text-sm font-bold text-[#2962ff]">{selectedStock.symbol}</span>
                        <span className="text-xs text-[#787b86]">{selectedStock.company_name}</span>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">

                {/* Left Panel: Deep Dive Analysis */}
                <div className="flex-1 flex flex-col min-w-0 border-r border-[#e0e3eb] dark:border-[#2a2e39] overflow-y-auto">
                    <div className="p-6">
                        {isStockLoading ? (
                            <div className="h-full flex flex-col items-center justify-center text-[#787b86] gap-3 py-20">
                                <div className="w-6 h-6 border-2 border-[#2962ff] border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs uppercase tracking-wide">Analysing {selectedStock?.symbol}...</span>
                            </div>
                        ) : stockAnalysis && selectedStock ? (
                            <div className="animate-in fade-in duration-300">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#131722] dark:text-[#d1d4dc] mb-1">{selectedStock.symbol} Analysis</h2>
                                        <div className="text-sm text-[#787b86]">Gemini-Pro 1.5 Generated Report</div>
                                    </div>
                                    <div className={`px-4 py-2 text-sm font-bold rounded-sm border ${stockAnalysis.rating.includes('Buy') ? 'border-[#00bfa5] text-[#00bfa5] bg-[#00bfa5]/10' :
                                        stockAnalysis.rating.includes('Sell') ? 'border-[#f23645] text-[#f23645] bg-[#f23645]/10' :
                                            'border-[#d1d4dc] text-[#d1d4dc]'
                                        }`}>
                                        {stockAnalysis.rating.toUpperCase()}
                                    </div>
                                </div>

                                {/* Tabs */}
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                    <TabsList className="w-full justify-start bg-transparent border-b border-[#e0e3eb] dark:border-[#2a2e39] rounded-none h-auto p-0 mb-6">
                                        <TabsTrigger
                                            value="summary"
                                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2962ff] data-[state=active]:bg-transparent data-[state=active]:text-[#2962ff] text-[#787b86] px-4 py-2"
                                        >
                                            Summary
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="technicals"
                                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2962ff] data-[state=active]:bg-transparent data-[state=active]:text-[#2962ff] text-[#787b86] px-4 py-2"
                                        >
                                            Technicals
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="financials"
                                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2962ff] data-[state=active]:bg-transparent data-[state=active]:text-[#2962ff] text-[#787b86] px-4 py-2"
                                        >
                                            Financials
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="forum"
                                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2962ff] data-[state=active]:bg-transparent data-[state=active]:text-[#2962ff] text-[#787b86] px-4 py-2"
                                        >
                                            Forum
                                        </TabsTrigger>
                                    </TabsList>

                                    {/* Summary Tab */}
                                    <TabsContent value="summary" className="mt-0">
                                        <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-4 rounded-sm mb-6">
                                            <p className="text-sm leading-relaxed text-[#131722] dark:text-[#d1d4dc]">{stockAnalysis.summary}</p>
                                        </div>

                                        {/* Stock Metrics Grid - Like the reference image */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                                            {/* Key Metrics */}
                                            <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-4 rounded-sm">
                                                <RangeBar
                                                    low={metrics.dayRange.low}
                                                    high={metrics.dayRange.high}
                                                    current={metrics.dayRange.current}
                                                    label="Day Range"
                                                />
                                                <RangeBar
                                                    low={metrics.weekRange52.low}
                                                    high={metrics.weekRange52.high}
                                                    current={metrics.dayRange.current}
                                                    label="52 Week Range"
                                                />

                                                <div className="space-y-2 mt-4">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[#787b86]">Previous Close</span>
                                                        <span className="text-[#131722] dark:text-[#d1d4dc] font-medium">{metrics.previousClose}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[#787b86]">Average Volume</span>
                                                        <span className="text-[#131722] dark:text-[#d1d4dc] font-medium">{metrics.averageVolume}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[#787b86]">Market Cap</span>
                                                        <span className="text-[#131722] dark:text-[#d1d4dc] font-medium">{metrics.marketCap}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[#787b86]">Shares Outstanding</span>
                                                        <span className="text-[#131722] dark:text-[#d1d4dc] font-medium">{metrics.sharesOutstanding}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[#787b86]">EPS (TTM)</span>
                                                        <span className="text-[#131722] dark:text-[#d1d4dc] font-medium">{metrics.eps}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[#787b86]">P/E (TTM)</span>
                                                        <span className="text-[#131722] dark:text-[#d1d4dc] font-medium">{metrics.peRatio ?? '-'}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[#787b86]">Fwd Dividend (% Yield)</span>
                                                        <span className="text-[#131722] dark:text-[#d1d4dc] font-medium">{metrics.fwdDividend ?? '-'}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[#787b86]">Ex-Dividend Date</span>
                                                        <span className="text-[#131722] dark:text-[#d1d4dc] font-medium">{metrics.exDividendDate ?? '-'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Analyst & Investor Info */}
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-3 rounded-sm">
                                                        <div className="text-xs text-[#787b86] mb-1">Analyst</div>
                                                        <div className="text-lg font-bold text-[#00bfa5]">{analystData.rating}</div>
                                                        <div className="text-xs text-[#787b86]">{analystData.count} analysts</div>
                                                    </div>
                                                    <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-3 rounded-sm">
                                                        <div className="text-xs text-[#787b86] mb-1">Target Price</div>
                                                        <div className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc]">{analystData.targetPrice} <span className="text-xs text-[#787b86]">USD</span></div>
                                                        <div className="text-xs text-[#787b86]">{analystData.count} analysts</div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-3 rounded-sm">
                                                        <div className="text-xs text-[#787b86] mb-1">Earnings</div>
                                                        <div className="text-xs text-[#787b86]">EPS Forecast</div>
                                                        <div className={`text-lg font-bold ${analystData.forecast === 'Up' ? 'text-[#00bfa5]' : 'text-[#f23645]'}`}>
                                                            ↗ {analystData.forecast}
                                                        </div>
                                                        <div className="text-xs text-[#787b86]">{analystData.nextQuarter}</div>
                                                    </div>
                                                    <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-3 rounded-sm">
                                                        <div className="text-xs text-[#787b86] mb-1">Investor</div>
                                                        <div className="text-xs text-[#787b86]">Top Seller</div>
                                                        <div className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc] truncate">{analystData.topSeller}</div>
                                                        <div className="text-xs text-[#f23645]">{analystData.topSellerChange}</div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-3 rounded-sm">
                                                        <div className="text-xs text-[#787b86] mb-1">Financials</div>
                                                        <div className="text-xs text-[#787b86]">Valuation</div>
                                                        <div className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc]">High <span className="text-xs text-[#787b86]">P/S</span></div>
                                                        <div className="text-xs text-[#787b86]">7.40 x</div>
                                                    </div>
                                                    <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-3 rounded-sm">
                                                        <div className="text-xs text-[#787b86] mb-1">Trading</div>
                                                        <div className="text-xs text-[#787b86]">Volume</div>
                                                        <div className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc]">High</div>
                                                        <div className="text-xs text-[#787b86]">2.18 x</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Radar Chart */}
                                            <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-4 rounded-sm">
                                                <div className="w-full h-48">
                                                    <RadarChart metrics={radarMetrics} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Insights */}
                                        <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-4 rounded-sm mb-6">
                                            <h3 className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc] mb-4 flex items-center gap-2">
                                                <Icons.AI className="w-4 h-4 text-[#2962ff]" />
                                                AI Insights
                                            </h3>
                                            <div className="space-y-2">
                                                {aiInsights.map((insight, i) => (
                                                    <div key={i} className="flex items-start gap-3 py-2 hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39] px-2 rounded cursor-pointer group">
                                                        <div className={`w-2 h-2 rounded-full mt-1.5 ${insight.type === 'positive' ? 'bg-[#00bfa5]' :
                                                            insight.type === 'negative' ? 'bg-[#f23645]' :
                                                                'bg-[#787b86]'
                                                            }`} />
                                                        <span className="text-sm text-[#131722] dark:text-[#d1d4dc] flex-1">{insight.text}</span>
                                                        {insight.expandable && (
                                                            <Icons.ChevronDown className="w-4 h-4 text-[#787b86] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="text-xs text-[#2962ff] mt-3 hover:underline">See more ∨</button>
                                        </div>

                                        {/* Bull and Bear Cases */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                                        {/* Top Stories */}
                                        <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-4 rounded-sm">
                                            <h3 className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc] mb-4">Top stories</h3>
                                            <div className="space-y-4">
                                                {topStories.map((story) => (
                                                    <div key={story.id} className="flex gap-3 cursor-pointer group">
                                                        <div className="w-8 h-8 bg-[#2962ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <Icons.News className="w-4 h-4 text-[#2962ff]" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-xs text-[#787b86] mb-1">
                                                                <span className="text-[#2962ff]">{story.source}</span> · {story.time}
                                                            </div>
                                                            <h4 className="text-sm font-medium text-[#131722] dark:text-[#d1d4dc] group-hover:text-[#2962ff] transition-colors">
                                                                {story.title}
                                                            </h4>
                                                            <p className="text-xs text-[#787b86] line-clamp-1">{story.summary}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* Technicals Tab */}
                                    <TabsContent value="technicals" className="mt-0">
                                        <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-6 rounded-sm">
                                            <h3 className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc] mb-4">Technical Analysis</h3>
                                            <p className="text-sm text-[#787b86]">Technical indicators and chart patterns for {selectedStock.symbol} will be displayed here.</p>
                                            <div className="mt-6 grid grid-cols-3 gap-4">
                                                <div className="text-center p-4 bg-[#00bfa5]/10 rounded">
                                                    <div className="text-2xl font-bold text-[#00bfa5]">Buy</div>
                                                    <div className="text-xs text-[#787b86]">Moving Averages</div>
                                                </div>
                                                <div className="text-center p-4 bg-[#787b86]/10 rounded">
                                                    <div className="text-2xl font-bold text-[#787b86]">Neutral</div>
                                                    <div className="text-xs text-[#787b86]">Oscillators</div>
                                                </div>
                                                <div className="text-center p-4 bg-[#00bfa5]/10 rounded">
                                                    <div className="text-2xl font-bold text-[#00bfa5]">Strong Buy</div>
                                                    <div className="text-xs text-[#787b86]">Summary</div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* Financials Tab */}
                                    <TabsContent value="financials" className="mt-0">
                                        <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-6 rounded-sm">
                                            <h3 className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc] mb-4">Financial Statements</h3>
                                            <p className="text-sm text-[#787b86]">Income statement, balance sheet, and cash flow data for {selectedStock.symbol}.</p>
                                            <div className="mt-6 space-y-3">
                                                <div className="flex justify-between py-2 border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                                                    <span className="text-sm text-[#787b86]">Revenue (TTM)</span>
                                                    <span className="text-sm font-medium text-[#131722] dark:text-[#d1d4dc]">$1.2B</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                                                    <span className="text-sm text-[#787b86]">Gross Profit (TTM)</span>
                                                    <span className="text-sm font-medium text-[#131722] dark:text-[#d1d4dc]">$520M</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                                                    <span className="text-sm text-[#787b86]">Net Income (TTM)</span>
                                                    <span className="text-sm font-medium text-[#f23645]">-$28M</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                                                    <span className="text-sm text-[#787b86]">Total Assets</span>
                                                    <span className="text-sm font-medium text-[#131722] dark:text-[#d1d4dc]">$2.8B</span>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-sm text-[#787b86]">Total Debt</span>
                                                    <span className="text-sm font-medium text-[#131722] dark:text-[#d1d4dc]">$450M</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* Forum Tab */}
                                    <TabsContent value="forum" className="mt-0">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc]">Community Discussion</h3>
                                                <button className="px-4 py-2 bg-[#2962ff] text-white text-sm font-medium rounded hover:bg-[#1e53e5] transition-colors">
                                                    New Post
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {forumPosts.map((post) => (
                                                    <div
                                                        key={post.id}
                                                        className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-4 rounded-sm hover:border-[#2962ff]/50 transition-colors cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-8 h-8 bg-[#2962ff]/10 rounded-full flex items-center justify-center">
                                                                <Icons.User className="w-4 h-4 text-[#2962ff]" />
                                                            </div>
                                                            <div>
                                                                <span className="text-sm font-medium text-[#131722] dark:text-[#d1d4dc]">{post.author}</span>
                                                                <span className="text-xs text-[#787b86] ml-2">{post.time}</span>
                                                            </div>
                                                        </div>
                                                        <h4 className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc] mb-2">{post.title}</h4>
                                                        <p className="text-xs text-[#787b86] line-clamp-2 mb-3">{post.content}</p>
                                                        <div className="flex items-center gap-4 text-xs text-[#787b86]">
                                                            <span className="flex items-center gap-1">
                                                                <Icons.TrendingUp className="w-3 h-3" />
                                                                {post.likes} likes
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Icons.Message className="w-3 h-3" />
                                                                {post.replies} replies
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
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