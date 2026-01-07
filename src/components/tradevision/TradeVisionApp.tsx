import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme, ViewState } from '@/types';
import { Icons } from './Icons';
import { MOCK_STOCKS, MOCK_NEWS, MOCK_INDICES, MOCK_CALENDAR, generateChartData } from '@/constants';
import ChartWidget from './ChartWidget';
import ResearchSection from './ResearchSection';
import MyResearchesView from './MyResearchesView';
import MarketsView from './MarketsView';
import MarketDetailView from './MarketDetailView';
import { useAuth } from '@/contexts/AuthContext';
import StockSearch from './StockSearch';
import { NotificationInboxPopover } from "@/components/ui/notification-inbox-popover";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TradeVisionApp: React.FC = () => {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
    const [activeView, setActiveView] = useState<ViewState>('home');
    const [rightPanelOpen, setRightPanelOpen] = useState(false);
    const [selectedMarketStock, setSelectedMarketStock] = useState<string | null>(null);
    const [researchTargetSymbol, setResearchTargetSymbol] = useState<string | undefined>(undefined);

    const [navOpen, setNavOpen] = useState(true);

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

    const handleMarketResearch = (symbol: string) => {
        setResearchTargetSymbol(symbol);
        setActiveView('my-researches');
        setSelectedMarketStock(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#f8f9fd] dark:bg-[#131722]">
                <div className="w-8 h-8 border-2 border-[#2962ff] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <TooltipProvider>
            <div className="flex h-screen w-full bg-[#ffffff] dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] overflow-hidden font-sans transition-colors duration-200">

                {/* LEFT TOOLBAR (Navigation) - Toggleable & Full Height */}
                <div className={`relative flex flex-col bg-white dark:bg-[#131722] border-r border-[#e0e3eb] dark:border-[#2a2e39] transition-all duration-300 z-30 ${navOpen ? 'w-[240px]' : 'w-[60px]'}`}>

                    {/* Logo Section inside Sidebar */}
                    <div className="h-[60px] min-h-[60px] flex items-center px-4 mb-2">
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => setActiveView('home')}
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2962ff] font-bold text-lg shadow-sm group-hover:bg-[#f0f3fa] dark:group-hover:bg-[#2a2e39] transition-colors">
                                {/* Using simple orange diamond-like shape or icon from reference, keeping existing icon but styling it */}
                                <Icons.TrendingUp className="w-6 h-6" />
                            </div>
                            <div className={`flex flex-col overflow-hidden transition-opacity duration-300 ${navOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                                <span className="font-bold tracking-tight text-lg leading-none text-[#131722] dark:text-[#e0e3eb] whitespace-nowrap">Headername</span>
                            </div>
                        </div>
                    </div>

                    <aside className="flex-1 flex flex-col items-center py-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
                        <div className="w-full px-3 flex flex-col gap-1">
                            <ToolbarButton
                                icon={Icons.Dashboard}
                                label="Home"
                                active={activeView === 'home'}
                                onClick={() => setActiveView('home')}
                                showLabel={navOpen}
                                tooltip="Home"
                            />
                            <ToolbarButton
                                icon={Icons.Markets}
                                label="Markets"
                                active={activeView === 'markets'}
                                onClick={() => setActiveView('markets')}
                                showLabel={navOpen}
                                tooltip="Markets"
                            />
                            <ToolbarButton
                                icon={Icons.AI}
                                label="My Portfolio"
                                active={activeView === 'research'}
                                onClick={() => setActiveView('research')}
                                showLabel={navOpen}
                                tooltip="My Portfolio"
                            />
                            <ToolbarButton
                                icon={Icons.FolderSearch}
                                label="My Researches"
                                active={activeView === 'my-researches'}
                                onClick={() => setActiveView('my-researches')}
                                showLabel={navOpen}
                                tooltip="My Researches"
                            />
                        </div>

                        <div className="w-full px-3 my-2">
                            <div className="h-[1px] bg-[#e0e3eb] dark:bg-[#2a2e39]" />
                        </div>

                        <div className="w-full px-3 flex flex-col gap-1">
                            <ToolbarButton
                                icon={Icons.List}
                                label="Watchlist"
                                active={rightPanelOpen}
                                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                                showLabel={navOpen}
                                tooltip="Watchlist"
                            />

                            {/* Educational Section */}
                            {navOpen ? (
                                <>
                                    <div className="mt-4 mb-2 px-3 transition-opacity duration-300">
                                        <span className="text-xs font-semibold text-[#b2b5be] uppercase tracking-wider">Educational</span>
                                    </div>
                                    <div className="flex flex-col gap-1 pl-3">
                                        <ToolbarButton
                                            label="Knowledge Base"
                                            active={false}
                                            showLabel={true}
                                            tooltip="Knowledge Base"
                                        />
                                        <ToolbarButton
                                            label="Watchlist Management"
                                            active={false}
                                            showLabel={true}
                                            tooltip="Watchlist Management"
                                        />
                                        <ToolbarButton
                                            label="The Formula"
                                            active={false}
                                            showLabel={true}
                                            tooltip="The Formula"
                                        />
                                        <ToolbarButton
                                            label="Podcasts"
                                            active={false}
                                            showLabel={true}
                                            tooltip="Podcasts"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="mt-2">
                                    <ToolbarButton
                                        icon={Icons.Education}
                                        label="Educational"
                                        active={false}
                                        onClick={() => setNavOpen(true)}
                                        showLabel={false}
                                        tooltip="Educational"
                                    />
                                </div>
                            )}

                            {/* Management Section */}
                            {navOpen ? (
                                <>
                                    <div className="mt-4 mb-2 px-3 transition-opacity duration-300">
                                        <span className="text-xs font-semibold text-[#b2b5be] uppercase tracking-wider">Management</span>
                                    </div>
                                    <div className="flex flex-col gap-1 pl-3">
                                        <ToolbarButton
                                            label="My Notes"
                                            active={false}
                                            showLabel={true}
                                            tooltip="My Notes"
                                        />
                                        <ToolbarButton
                                            label="Simulations"
                                            active={false}
                                            showLabel={true}
                                            tooltip="Simulations"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="mt-2">
                                    <ToolbarButton
                                        icon={Icons.Management}
                                        label="Management"
                                        active={false}
                                        onClick={() => setNavOpen(true)}
                                        showLabel={false}
                                        tooltip="Management"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-auto w-full px-3 flex flex-col gap-2 mb-4">
                            <ToolbarButton
                                icon={Icons.Settings}
                                label="Settings"
                                active={false}
                                showLabel={navOpen}
                                tooltip="Settings"
                            />
                        </div>
                    </aside>

                    {/* Left Nav Toggle Button */}
                    {/* Left Nav Toggle Button */}
                    <Button
                        onClick={() => setNavOpen(!navOpen)}
                        size="icon"
                        variant="outline"
                        className="absolute right-0 top-1/2 translate-x-1/2 z-40 shadow-md bg-background rounded-lg"
                        aria-label={navOpen ? "Collapse Navigation" : "Expand Navigation"}
                    >
                        {navOpen ? <Icons.ChevronLeft size={16} /> : <Icons.ChevronRight size={16} />}
                    </Button>
                </div>

                {/* MAIN CONTENT AREA (Header + Content) */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">

                    {/* TOP HEADER - Now inside main content area */}
                    <header className="h-[60px] min-h-[60px] flex items-center justify-between px-6 border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#131722] z-20">

                        {/* Search Bar - Taking prominent space */}
                        <div className="flex-1 max-w-xl">
                            <StockSearch
                                className="w-full"
                                onSelect={(stock) => console.log('Selected:', stock)}
                            />
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            {/* Notification Bell (Added per image suggestion, reusing Bell icon) */}
                            <NotificationInboxPopover />

                            <Button
                                size="icon"
                                variant="outline"
                                className="relative"
                                onClick={toggleTheme}
                                aria-label={`Switch to ${theme === Theme.DARK ? 'Light' : 'Dark'} Mode`}
                            >
                                {theme === Theme.DARK ? <Icons.Sun size={16} strokeWidth={2} /> : <Icons.Moon size={16} strokeWidth={2} />}
                            </Button>

                            <div className="h-6 w-[1px] bg-[#e0e3eb] dark:bg-[#2a2e39]" />

                            {user && (
                                <Button variant="outline" className="gap-2 px-2 h-9 border-input"
                                    onClick={() => { /* User menu or nothing for now */ }}
                                >
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                    <span className="text-xs font-bold text-[#131722] dark:text-[#d1d4dc] hidden sm:block">
                                        John Marker Ui
                                    </span>
                                </Button>
                            )}
                        </div>
                    </header>

                    {/* CANVAS CONTENT */}
                    <div className="flex-1 flex overflow-hidden relative">
                        <main className="flex-1 bg-[#ffffff] dark:bg-[#131722] relative overflow-hidden flex flex-col">
                            {activeView === 'home' && <HomeView />}
                            {activeView === 'research' && <ResearchSection />}
                            {activeView === 'markets' && (
                                !selectedMarketStock
                                    ? <MarketsView onStockClick={setSelectedMarketStock} />
                                    : <MarketDetailView
                                        symbol={selectedMarketStock}
                                        onBack={() => setSelectedMarketStock(null)}
                                        onResearch={handleMarketResearch}
                                    />
                            )}
                            {activeView === 'dashboard' && <MarketOverviewMode />}
                            {activeView === 'my-researches' && <MyResearchesView initialSymbol={researchTargetSymbol} />}
                        </main>

                        {/* RIGHT SIDEBAR (Watchlist) - Toggleable */}
                        <div className={`relative flex h-full transition-all duration-300 ${rightPanelOpen ? 'w-[300px]' : 'w-0'}`}>

                            {/* Toggle Button */}
                            {/* Toggle Button */}
                            <button
                                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                                className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bg-white dark:bg-[#1e222d] border border-r-0 border-[#e0e3eb] dark:border-[#2a2e39] p-1 rounded-l-md shadow-md z-20 flex items-center justify-center h-12 w-6 hover:text-[#2962ff] transition-colors"
                                title={rightPanelOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                            >
                                {rightPanelOpen ? <Icons.ChevronRight className="w-4 h-4" /> : <Icons.ChevronLeft className="w-4 h-4" />}
                            </button>

                            <aside className={`w-[300px] flex flex-col border-l border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#131722] z-10 shrink-0 shadow-xl lg:shadow-none h-full overflow-hidden ${!rightPanelOpen && 'hidden'}`}>
                                {/* Watchlist Header */}
                                <div className="h-[48px] min-h-[48px] flex items-center justify-between px-3 border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-[#f8f9fd] dark:bg-[#1e222d] whitespace-nowrap">
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
                                                <span className="text-xs text-[#787b86] truncate max-w-[120px]">{stock.name}</span>
                                                <span className={`text-xs font-medium ${stock.change >= 0 ? 'text-[#00bfa5]' : 'text-[#f23645]'}`}>
                                                    {stock.change > 0 ? '+' : ''}{stock.changePercent}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
};

const ToolbarButton = ({ icon: Icon, active, onClick, tooltip, label, showLabel }: { icon?: any, active: boolean, onClick?: () => void, tooltip?: string, label?: string, showLabel?: boolean }) => (
    <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
            <button
                onClick={onClick}
                className={`w-full h-10 flex items-center ${showLabel ? 'justify-start px-3' : 'justify-center'} rounded-xl transition-all relative group mb-2
          ${active
                        ? 'text-[#2962ff] bg-[#2962ff]/10 dark:bg-[#2962ff]/20'
                        : 'text-[#787b86] hover:text-[#131722] dark:hover:text-[#d1d4dc] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'}`}
            >
                {Icon && <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />}

                {showLabel && (
                    <span className={`${Icon ? 'ml-3' : ''} text-sm font-medium whitespace-nowrap overflow-hidden transition-opacity duration-300 ${showLabel ? 'opacity-100' : 'opacity-0'}`}>
                        {label}
                    </span>
                )}
            </button>
        </TooltipTrigger>
        {tooltip && !showLabel && (
            <TooltipContent side="right" className="z-50 bg-[#131722] text-white border-[#2a2e39]">
                <p>{tooltip}</p>
            </TooltipContent>
        )}
    </Tooltip>
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

        <div className="w-full px-6 py-8">
            {/* Hero Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#131722] dark:text-[#e0e3eb] mb-2">Global Market Overview</h1>
                <p className="text-[#787b86]">Real-time data and financial news from major exchanges.</p>
            </div>

            {/* Major Indices Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {MOCK_INDICES.slice(0, 4).map((idx) => (
                    <div key={idx.name} className="bg-white dark:bg-[#1e222d] p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
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

                        <div className="bg-white dark:bg-[#1e222d] rounded-xl overflow-hidden shadow-sm">
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
                        <div className="bg-white dark:bg-[#1e222d] rounded-xl overflow-hidden shadow-sm">
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
                    <div className="bg-white dark:bg-[#1e222d] rounded-xl shadow-sm p-5">
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
                    <div className="bg-white dark:bg-[#1e222d] rounded-xl shadow-sm p-5">
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
