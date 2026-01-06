import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme, ViewState } from '@/types';
import { Icons } from './Icons';
import { MOCK_STOCKS, MOCK_NEWS, MOCK_INDICES, MOCK_CALENDAR, generateChartData } from '@/constants';
import ChartWidget from './ChartWidget';
import ResearchSection from './ResearchSection';
import MyResearchesView from './MyResearchesView';
import { useAuth } from '@/contexts/AuthContext';

const TradeVisionApp: React.FC = () => {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
    const [activeView, setActiveView] = useState<ViewState>('home');
    const [rightPanelOpen, setRightPanelOpen] = useState(false);

    // Redirect to auth if not logged in
    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth');
        }
    }, [user, loading, navigate]);

    // Handle Theme Changes
    useEffect(() => {
        if (theme === Theme.DARK) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/auth');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#f8f9fd] dark:bg-[#131722]">
                <div className="w-8 h-8 border-2 border-[#2962ff] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-full bg-[#ffffff] dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] overflow-hidden font-sans transition-colors duration-200">

            {/* --- TOP HEADER --- */}
            <header className="h-[52px] min-h-[52px] flex items-center justify-between px-4 border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#131722] z-20">
                <div className="flex items-center gap-6">
                    {/* Logo - Navigates to Home */}
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => setActiveView('home')}
                    >
                        <div className="w-8 h-8 bg-[#2962ff] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-[#1e53e5] transition-colors">
                            <Icons.TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold tracking-tight text-lg leading-none text-[#131722] dark:text-[#e0e3eb]">TradeVision</span>
                            <span className="text-[10px] font-medium text-[#787b86] uppercase tracking-wider">Terminal</span>
                        </div>
                    </div>

                    <div className="h-6 w-[1px] bg-[#e0e3eb] dark:bg-[#2a2e39]" />

                    {/* Main Search */}
                    <div className="relative hidden md:block w-96">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#787b86]" />
                        <input
                            type="text"
                            placeholder="Search markets, news, or symbols..."
                            className="w-full bg-[#f0f3fa] dark:bg-[#1e222d] border border-transparent focus:bg-white dark:focus:bg-[#2a2e39] focus:border-[#2962ff] rounded-md pl-10 pr-4 py-1.5 text-sm transition-all outline-none text-[#131722] dark:text-[#d1d4dc] placeholder-[#787b86]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-[#787b86] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] rounded-full transition-colors"
                        title={`Switch to ${theme === Theme.DARK ? 'Light' : 'Dark'} Mode`}
                    >
                        {theme === Theme.DARK ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
                    </button>

                    <div className="h-5 w-[1px] bg-[#e0e3eb] dark:bg-[#2a2e39]" />

                    {user && (
                        <>
                            <div className="hidden sm:flex items-center gap-2 text-[#131722] dark:text-[#d1d4dc] text-sm">
                                <Icons.User className="w-5 h-5" />
                                <span className="max-w-[120px] truncate">{user.email}</span>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="bg-[#f23645] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#d52f3d] transition-colors shadow-sm"
                            >
                                Sign Out
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* --- MAIN LAYOUT GRID --- */}
            <div className="flex-1 flex overflow-hidden">

                {/* LEFT TOOLBAR (Navigation) */}
                <aside className="w-[60px] flex flex-col items-center py-4 border-r border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#131722] z-10 shrink-0">
                    <ToolbarButton icon={Icons.Dashboard} active={activeView === 'home'} onClick={() => setActiveView('home')} tooltip="Home" />
                    <ToolbarButton icon={Icons.Markets} active={activeView === 'markets'} onClick={() => setActiveView('markets')} tooltip="Markets" />
                    <ToolbarButton icon={Icons.AI} active={activeView === 'research'} onClick={() => setActiveView('research')} tooltip="Research & AI" />
                    <ToolbarButton icon={Icons.FolderSearch} active={activeView === 'my-researches'} onClick={() => setActiveView('my-researches')} tooltip="My Researches" />
                    <div className="w-8 h-[1px] bg-[#e0e3eb] dark:bg-[#2a2e39] my-2" />
                    <ToolbarButton icon={Icons.List} active={rightPanelOpen} onClick={() => setRightPanelOpen(!rightPanelOpen)} tooltip="Watchlist" />

                    <div className="mt-auto flex flex-col gap-2">
                        <ToolbarButton icon={Icons.Settings} active={false} tooltip="Settings" />
                    </div>
                </aside>

                {/* CENTER CANVAS */}
                <main className="flex-1 bg-[#ffffff] dark:bg-[#131722] relative overflow-hidden flex flex-col">
                    {activeView === 'home' && <HomeView />}
                    {activeView === 'research' && <ResearchSection />}
                    {activeView === 'markets' && <FullChartMode />}
                    {activeView === 'dashboard' && <MarketOverviewMode />}
                    {activeView === 'my-researches' && <MyResearchesView />}
                </main>

                {/* RIGHT SIDEBAR (Watchlist) - Toggleable */}
                {rightPanelOpen && (
                    <aside className="w-[300px] flex flex-col border-l border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#131722] z-10 shrink-0 shadow-xl lg:shadow-none absolute right-0 h-full lg:relative">
                        {/* Watchlist Header */}
                        <div className="h-[48px] min-h-[48px] flex items-center justify-between px-3 border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-[#f8f9fd] dark:bg-[#1e222d]">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <span className="text-sm font-bold uppercase tracking-wider text-[#131722] dark:text-[#d1d4dc]">Watchlist</span>
                                <Icons.ChevronDown className="w-3 h-3 text-[#787b86]" />
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => setRightPanelOpen(false)} className="lg:hidden p-1">
                                    <Icons.X className="w-4 h-4 text-[#787b86]" />
                                </button>
                                <Icons.Plus className="w-4 h-4 text-[#787b86] cursor-pointer hover:text-[#2962ff]" />
                                <Icons.More className="w-4 h-4 text-[#787b86] cursor-pointer hover:text-[#2962ff]" />
                            </div>
                        </div>

                        {/* Watchlist Items */}
                        <div className="flex-1 overflow-y-auto bg-white dark:bg-[#131722]">
                            {MOCK_STOCKS.map(stock => (
                                <div key={stock.symbol} className="px-3 py-3 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] cursor-pointer group border-b border-[#e0e3eb] dark:border-[#2a2e39] last:border-0 border-opacity-50">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <span className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">{stock.symbol}</span>
                                        <span className="text-sm font-medium text-[#131722] dark:text-[#d1d4dc]">{stock.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-[#787b86]">{stock.name}</span>
                                        <span className={`text-xs font-medium ${stock.change >= 0 ? 'text-[#00bfa5]' : 'text-[#f23645]'}`}>
                                            {stock.change > 0 ? '+' : ''}{stock.changePercent}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
};

const ToolbarButton = ({ icon: Icon, active, onClick, tooltip }: { icon: any, active: boolean, onClick?: () => void, tooltip?: string }) => (
    <button
        onClick={onClick}
        className={`w-10 h-10 flex items-center justify-center rounded-xl mb-2 transition-all relative group
      ${active
                ? 'text-[#2962ff] bg-[#2962ff]/10 dark:bg-[#2962ff]/20'
                : 'text-[#787b86] hover:text-[#131722] dark:hover:text-[#d1d4dc] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'}`}
    >
        <Icon className="w-5 h-5" strokeWidth={2} />
        {tooltip && (
            <div className="absolute left-12 bg-[#131722] text-white text-xs font-medium px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-md">
                {tooltip}
            </div>
        )}
    </button>
);

// --- VIEWS ---

const HomeView = () => (
    <div className="flex-1 overflow-y-auto bg-[#f8f9fd] dark:bg-[#131722]">
        {/* Ticker Tape */}
        <div className="w-full bg-[#131722] text-white overflow-hidden py-2 whitespace-nowrap flex items-center">
            <div className="flex items-center gap-8 animate-marquee pl-4">
                {[...MOCK_INDICES, ...MOCK_INDICES].map((index, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium">
                        <span className="opacity-70">{index.name}</span>
                        <span>{index.value.toLocaleString()}</span>
                        <span className={index.change >= 0 ? "text-[#00bfa5]" : "text-[#f23645]"}>
                            {index.change > 0 ? '+' : ''}{index.changePercent}%
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Hero Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#131722] dark:text-[#e0e3eb] mb-2">Global Market Overview</h1>
                <p className="text-[#787b86]">Real-time data and financial news from major exchanges.</p>
            </div>

            {/* Major Indices Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {MOCK_INDICES.slice(0, 4).map((idx) => (
                    <div key={idx.name} className="bg-white dark:bg-[#1e222d] p-5 rounded-lg border border-[#e0e3eb] dark:border-[#2a2e39] shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-lg text-[#131722] dark:text-[#e0e3eb] group-hover:text-[#2962ff] transition-colors">{idx.name}</h3>
                            <Icons.ArrowRight className="w-4 h-4 text-[#787b86] group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="text-2xl font-bold text-[#131722] dark:text-[#d1d4dc] mb-1">
                            {idx.value.toLocaleString()}
                        </div>
                        <div className={`flex items-center gap-2 text-sm font-medium ${idx.change >= 0 ? "text-[#00bfa5]" : "text-[#f23645]"}`}>
                            {idx.change >= 0 ? <Icons.TrendingUp className="w-4 h-4" /> : <Icons.TrendingDown className="w-4 h-4" />}
                            <span>{idx.change > 0 ? '+' : ''}{idx.change}</span>
                            <span>({idx.changePercent}%)</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Top Stories */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-[#131722] dark:text-[#e0e3eb] flex items-center gap-2">
                                <div className="w-1 h-6 bg-[#2962ff] rounded-full"></div>
                                Top Financial News
                            </h2>
                            <button className="text-sm font-medium text-[#2962ff] hover:text-[#1e53e5]">View All News</button>
                        </div>

                        <div className="bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden shadow-sm">
                            {/* Featured Story */}
                            <div className="p-0 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-[#e0e3eb] dark:border-[#2a2e39] cursor-pointer hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39] transition-colors">
                                <div className="sm:col-span-1 h-48 sm:h-auto bg-gray-200 dark:bg-[#2a2e39] rounded-lg overflow-hidden relative">
                                    <img src={MOCK_NEWS[0].imageUrl || "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=300&h=200"} alt="News" className="w-full h-full object-cover" />
                                    <div className="absolute top-2 left-2 bg-[#2962ff] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                        {MOCK_NEWS[0].category || "Markets"}
                                    </div>
                                </div>
                                <div className="sm:col-span-2 p-4 sm:p-0 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-xs text-[#787b86] mb-2">
                                        <span className="font-semibold text-[#131722] dark:text-[#d1d4dc]">{MOCK_NEWS[0].source}</span>
                                        <span>•</span>
                                        <span>{MOCK_NEWS[0].time}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#131722] dark:text-[#e0e3eb] mb-2 leading-tight">
                                        {MOCK_NEWS[0].title}
                                    </h3>
                                    <p className="text-sm text-[#787b86] dark:text-[#b2b5be] line-clamp-2 mb-3">
                                        {MOCK_NEWS[0].summary}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${MOCK_NEWS[0].sentiment === 'bullish' ? 'bg-[#00bfa5]/10 text-[#00bfa5]' : 'bg-[#f23645]/10 text-[#f23645]'}`}>
                                            {MOCK_NEWS[0].sentiment.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* List Stories */}
                            <div className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39]">
                                {MOCK_NEWS.slice(1).map(news => (
                                    <div key={news.id} className="p-4 flex gap-4 cursor-pointer hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39] transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 text-[11px] text-[#787b86] mb-1">
                                                <span className="font-bold text-[#131722] dark:text-[#d1d4dc]">{news.source}</span>
                                                <span>•</span>
                                                <span>{news.time}</span>
                                                <span className="text-[#2962ff] ml-2">{news.category}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-[#131722] dark:text-[#e0e3eb] mb-1 hover:text-[#2962ff] transition-colors">
                                                {news.title}
                                            </h4>
                                        </div>
                                        {news.sentiment !== 'neutral' && (
                                            <div className={`flex-shrink-0 w-1 rounded-full ${news.sentiment === 'bullish' ? 'bg-[#00bfa5]' : 'bg-[#f23645]'}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Market Movers Table */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-[#131722] dark:text-[#e0e3eb] flex items-center gap-2">
                                <Icons.TrendingUp className="w-5 h-5 text-[#00bfa5]" />
                                Market Movers
                            </h2>
                        </div>
                        <div className="bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-[#f8f9fd] dark:bg-[#131722] text-[#787b86] font-medium border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                                        <tr>
                                            <th className="px-6 py-3">Symbol</th>
                                            <th className="px-6 py-3">Price</th>
                                            <th className="px-6 py-3">Change %</th>
                                            <th className="px-6 py-3 text-right">Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39]">
                                        {MOCK_STOCKS.map(stock => (
                                            <tr key={stock.symbol} className="hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39] transition-colors">
                                                <td className="px-6 py-3 font-bold text-[#131722] dark:text-[#e0e3eb]">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded bg-gray-100 dark:bg-[#2a2e39] flex items-center justify-center text-[10px] font-bold text-[#787b86]">
                                                            {stock.symbol[0]}
                                                        </div>
                                                        <div>
                                                            <div>{stock.symbol}</div>
                                                            <div className="text-xs font-normal text-[#787b86]">{stock.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 font-medium text-[#131722] dark:text-[#d1d4dc]">${stock.price.toFixed(2)}</td>
                                                <td className={`px-6 py-3 font-bold ${stock.change >= 0 ? "text-[#00bfa5]" : "text-[#f23645]"}`}>
                                                    {stock.change > 0 ? '+' : ''}{stock.changePercent}%
                                                </td>
                                                <td className="px-6 py-3 text-right text-[#131722] dark:text-[#d1d4dc]">{stock.volume}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">

                    {/* Economic Calendar Widget */}
                    <div className="bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] shadow-sm p-5">
                        <h3 className="font-bold text-[#131722] dark:text-[#e0e3eb] mb-4 flex items-center gap-2">
                            <Icons.List className="w-5 h-5 text-[#2962ff]" />
                            Economic Calendar
                        </h3>
                        <div className="space-y-4">
                            {MOCK_CALENDAR.map((event, i) => (
                                <div key={i} className="flex gap-3 items-start relative pb-4 border-b border-[#e0e3eb] dark:border-[#2a2e39] last:border-0 last:pb-0">
                                    <div className="flex flex-col items-center min-w-[50px]">
                                        <span className="text-xs font-bold text-[#131722] dark:text-[#d1d4dc]">{event.time}</span>
                                        <span className="text-[10px] text-[#787b86] bg-[#f0f3fa] dark:bg-[#2a2e39] px-1.5 rounded">{event.currency}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-[#131722] dark:text-[#e0e3eb] leading-tight mb-1">{event.event}</div>
                                        <div className="flex items-center gap-3 text-xs text-[#787b86]">
                                            <div className="flex items-center gap-1">
                                                <span>Imp:</span>
                                                <div className="flex">
                                                    {[1, 2, 3].map(s => (
                                                        <div key={s} className={`w-1.5 h-1.5 rounded-full mx-[1px] ${s <= (event.importance === 'high' ? 3 : event.importance === 'medium' ? 2 : 1)
                                                                ? 'bg-[#2962ff]' : 'bg-gray-300 dark:bg-gray-700'
                                                            }`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <span>Fcst: {event.forecast}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 text-sm font-medium text-[#2962ff] bg-[#2962ff]/5 hover:bg-[#2962ff]/10 rounded transition-colors">
                            View Full Calendar
                        </button>
                    </div>

                    {/* Market Sentiment Widget */}
                    <div className="bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] shadow-sm p-5">
                        <h3 className="font-bold text-[#131722] dark:text-[#e0e3eb] mb-4">Market Sentiment</h3>
                        <div className="flex items-center justify-center mb-4 relative">
                            {/* Semi-circle Gauge Mock */}
                            <div className="w-32 h-16 bg-gradient-to-r from-[#f23645] via-[#fb8c00] to-[#00bfa5] rounded-t-full relative overflow-hidden opacity-80">
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full w-2 h-8 bg-white origin-bottom rotate-45 border border-gray-300 shadow-md z-10"></div>
                            </div>
                            <div className="absolute top-[80%] text-2xl font-bold text-[#131722] dark:text-[#e0e3eb]">68</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[#00bfa5] font-bold text-lg uppercase">Greed</div>
                            <div className="text-xs text-[#787b86]">Last Week: 62 (Greed)</div>
                        </div>
                    </div>

                    {/* Ad / Promo Placeholder */}
                    <div className="bg-gradient-to-br from-[#1e53e5] to-[#2962ff] rounded-xl p-6 text-white text-center">
                        <h4 className="font-bold text-lg mb-2">Upgrade to Pro</h4>
                        <p className="text-blue-100 text-sm mb-4">Get real-time data, unlimited charts, and AI-powered insights.</p>
                        <button className="bg-white text-[#2962ff] text-sm font-bold px-4 py-2 rounded shadow-md hover:bg-gray-50 transition-colors w-full">
                            Start Free Trial
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
);

// Placeholder Views for other tabs
const FullChartMode = () => (
    <div className="w-full h-full p-1 bg-[#131722]">
        <div className="w-full h-full bg-white dark:bg-[#131722] border border-[#e0e3eb] dark:border-[#2a2e39] flex flex-col">
            <div className="h-[40px] border-b border-[#e0e3eb] dark:border-[#2a2e39] flex items-center px-4 gap-4 bg-white dark:bg-[#131722]">
                <span className="text-sm font-semibold text-[#2962ff]">AAPL</span>
                <span className="text-xs text-[#787b86]">Apple Inc.</span>
            </div>
            <div className="flex-1 relative bg-white dark:bg-[#131722]">
                <ChartWidget data={generateChartData(100)} height={600} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2a2e39] text-9xl font-bold opacity-5 pointer-events-none">
                    AAPL
                </div>
            </div>
        </div>
    </div>
);

const MarketOverviewMode = () => (
    <div className="w-full h-full p-4 overflow-y-auto bg-[#f8f9fd] dark:bg-[#131722]">
        <h2 className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc] mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_STOCKS.map(stock => (
                <div key={stock.symbol} className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] p-4 rounded-sm">
                    <div className="flex justify-between mb-4">
                        <span className="font-bold text-[#131722] dark:text-white">{stock.symbol}</span>
                        <span className={stock.change >= 0 ? 'text-[#00bfa5]' : 'text-[#f23645]'}>{stock.changePercent}%</span>
                    </div>
                    <ChartWidget data={generateChartData(20)} height={100} color={stock.change >= 0 ? "#00BFA5" : "#F23645"} />
                </div>
            ))}
        </div>
    </div>
);

export default TradeVisionApp;
