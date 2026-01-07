import React from 'react';
import { Icons } from './Icons';

interface NewsItem {
    id: string;
    title: string;
    snippet: string;
    source: string;
    author: string;
    timeAgo: string;
    imageUrl?: string; // Optional real image URL
    isPro?: boolean;
    comments?: number;
}

const MOCK_NEWS: NewsItem[] = [
    {
        id: '1',
        title: "Meta names Microsoft's Mahoney as chief legal officer",
        snippet: "Jan 6 (Reuters) - Meta Platforms said on Tuesday it has appointed C.J. Mahoney, a seasoned legal executive with a career in both...",
        source: "Reuters",
        author: "Reuters",
        timeAgo: "2 hours ago",
        imageUrl: "meta" // placeholder signal
    },
    {
        id: '2',
        title: "Former Apple iPhone Air designer joins AI startup Hark",
        snippet: "Investing.com -- Former Apple Inc. designer Abidur Chowdhury, who helped create the iPhone Air, is joining AI startup Hark as head...",
        source: "Investing.com",
        author: "Investing.com",
        timeAgo: "3 hours ago",
        imageUrl: "apple-design"
    },
    {
        id: '3',
        title: "STMicroelectronics shares jump 7% on report Apple in talks over LiDAR sensors",
        snippet: "Investing.com -- U.S. listed shares of STMicroelectronics NV (EPA:STMPA) rose about 7% on Wednesday after industry sources said...",
        source: "Investing.com",
        author: "Investing.com",
        timeAgo: "6 hours ago",
        imageUrl: "stmicro"
    },
    {
        id: '4',
        title: "STMicroelectronics stock holds steady as Morgan Stanley sees Apple LiDAR opportunity",
        snippet: "Investing.com - Morgan Stanley has maintained its Equalweight rating and EUR20.00 price target on STMicroelectronics NV (EPA:STM)...",
        source: "Investing.com",
        author: "Investing.com",
        timeAgo: "6 hours ago",
        imageUrl: "apple-logo"
    },
    {
        id: '5',
        title: "UBS maintains Apple stock rating at Neutral on slowing App Store growth",
        snippet: "Investing.com - UBS has reiterated its Neutral rating and $280.00 price target on Apple (NASDAQ:AAPL) following analysis of recent...",
        source: "Investing.com",
        author: "Investing.com",
        timeAgo: "8 hours ago",
        imageUrl: "apple-logo-2"
    },
    {
        id: '6',
        title: "Apple Computer Inc receives Investment Bank Analyst Rating Update",
        snippet: "",
        source: "Investing.com",
        author: "Investing.com",
        timeAgo: "9 hours ago",
        isPro: true,
        comments: 1,
        imageUrl: "wall-street"
    },
    {
        id: '7',
        title: "BofA Securities maintains Buy rating on Apple stock with $325 target",
        snippet: "Investing.com - BofA Securities has reiterated its Buy rating on Apple (NASDAQ:AAPL) with a price target of $325.00, according to...",
        source: "Investing.com",
        author: "Investing.com",
        timeAgo: "14 hours ago",
        imageUrl: "apple-logo-3"
    }
];

const StockNewsView: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc]">AAPL News</h2>
                <Icons.Info className="w-4 h-4 text-[#787b86]" />
            </div>

            <div className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39]">
                {MOCK_NEWS.map((item) => (
                    <div key={item.id} className="py-6 flex gap-6 group cursor-pointer">
                        {/* Thumbnail Placeholder */}
                        <div className="w-32 h-20 shrink-0 bg-[#f0f3fa] dark:bg-[#2a2e39] rounded overflow-hidden flex items-center justify-center">
                            {/* Simulating images with icons/text since we don't have real assets */}
                            {item.imageUrl === 'meta' && <span className="text-2xl font-bold text-[#2962ff]">∞ Meta</span>}
                            {item.imageUrl?.includes('apple') && <Icons.User className="w-8 h-8 text-[#787b86]" />}
                            {item.imageUrl === 'stmicro' && <span className="font-bold text-[#787b86]">STM</span>}
                            {item.imageUrl === 'wall-street' && <span className="font-bold text-[#00bfa5] text-xs p-1 text-center">WALL ST</span>}
                            {!item.imageUrl && <Icons.News className="w-8 h-8 text-[#787b86]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-[#131722] dark:text-[#d1d4dc] group-hover:text-[#2962ff] transition-colors mb-2 leading-tight">
                                {item.title}
                            </h3>

                            {item.snippet && (
                                <p className="text-sm text-[#787b86] line-clamp-2 mb-3 leading-relaxed">
                                    {item.snippet}
                                </p>
                            )}

                            <div className="flex items-center gap-2 text-xs text-[#787b86]">
                                {item.isPro && (
                                    <span className="flex items-center gap-1 text-[#ff6d00] font-bold bg-[#ff6d00]/10 px-1.5 py-0.5 rounded">
                                        <Icons.Lock className="w-3 h-3" /> Pro
                                    </span>
                                )}
                                <span className="mr-1">By {item.author}</span>
                                <span className="w-0.5 h-0.5 rounded-full bg-[#787b86]" />
                                <span>{item.timeAgo}</span>

                                {item.comments && (
                                    <div className="flex items-center gap-1 ml-2 text-[#2962ff]">
                                        <Icons.Message className="w-3 h-3" />
                                        <span>{item.comments}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockNewsView;
