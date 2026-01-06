import React, { useState } from 'react';
import { Icons } from './Icons';
import { MOCK_STOCKS } from '@/constants';

type TabKey = 'summary' | 'managements' | 'financial' | 'evaluation' | 'insights' | 'financial-variables' | 'forum';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'summary', label: 'Summary' },
  { key: 'managements', label: 'Managements' },
  { key: 'financial', label: 'Financial' },
  { key: 'evaluation', label: 'Evaluation' },
  { key: 'insights', label: 'Insights' },
  { key: 'financial-variables', label: 'Financial Variables' },
  { key: 'forum', label: 'Forum' },
];

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
const generateMockMetrics = (): StockMetrics => ({
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

const MyResearchesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('summary');
  const [selectedStock, setSelectedStock] = useState<string | null>(MOCK_STOCKS[0]?.symbol || null);

  // Mock data
  const metrics = generateMockMetrics();
  const aiInsights = generateMockAIInsights();
  const radarMetrics = generateMockRadarMetrics();
  const analystData = generateMockAnalystData();
  const topStories = generateMockTopStories();
  const forumPosts = generateMockForumPosts();

  const selectedStockData = MOCK_STOCKS.find(s => s.symbol === selectedStock);

  const renderTabContent = () => {
    if (!selectedStock) {
      return (
        <div className="bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] p-8 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <Icons.FileText className="w-12 h-12 text-[#787b86] mx-auto mb-4" />
            <p className="text-sm text-[#787b86]">Select a stock to view details</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-6">
            {/* Stock Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
            <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-4 rounded-sm">
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
          </div>
        );

      case 'forum':
        return (
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
        );

      default:
        return (
          <div className="bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] p-8 min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Icons.FileText className="w-12 h-12 text-[#787b86] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#131722] dark:text-[#d1d4dc] mb-2">
                {TABS.find(t => t.key === activeTab)?.label}
              </h3>
              <p className="text-sm text-[#787b86]">
                Data for {selectedStock} will appear here
              </p>
            </div>
          </div>
        );
    }
  };

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
        {renderTabContent()}
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