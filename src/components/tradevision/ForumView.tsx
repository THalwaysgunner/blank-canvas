import React, { useState } from 'react';
import { Icons } from './Icons';

interface ForumPost {
    id: string;
    author: string;
    time: string;
    ticker: string;
    content: string;
    imageUrl?: string;
    likes: number;
    replies: number;
    isBullish?: boolean;
}

const MOCK_FORUM_POSTS: ForumPost[] = [
    {
        id: '1',
        author: 'quickshiftinn',
        time: '4 days ago',
        ticker: 'BABA',
        content: "monster pump off support, let's see if it holds",
        imageUrl: 'chart-baba',
        likes: 7,
        replies: 0,
        isBullish: true
    },
    {
        id: '2',
        author: 'Jshi1211',
        time: '5 days ago',
        ticker: 'BABA',
        content: 'Daily BX turned red again...But good news is that it is a doji - very likely, we have our trend reversal here.',
        imageUrl: '',
        likes: 1,
        replies: 0,
        isBullish: true
    }
];

// Placeholder component for the chart image shown in the forum post
const ChartImagePlaceholder: React.FC<{ ticker: string }> = ({ ticker }) => (
    <div className="w-full h-[300px] bg-[#131722] rounded-lg mt-3 overflow-hidden border border-[#2a2e39] relative flex flex-col items-center justify-center p-4">
        {/* Mock Chart UI */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xs border border-orange-500/50">
                {ticker.charAt(0)}
            </div>
            <span className="text-white font-bold">{ticker}.com</span>
        </div>

        {/* Mock Candlesticks */}
        <div className="w-full h-full flex items-end justify-around px-10 pb-10 gap-1 opacity-80">
            {Array.from({ length: 20 }).map((_, i) => {
                const height = Math.random() * 60 + 20 + '%';
                const isGreen = i > 12; // Bullish trend at end
                return (
                    <div key={i} className={`w-2 rounded-sm ${isGreen ? 'bg-[#00bfa5]' : 'bg-[#f23645]'}`} style={{ height }} />
                )
            })}
            {/* Trend line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00bfa5] to-[#00bfa5] rotate-[-15deg] transform translate-y-20 opacity-50"></div>
        </div>

        <div className="absolute bottom-2 left-4 text-[10px] text-[#787b86]">TradingView</div>
    </div>
);

const ForumView: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc]">Community discussions</h2>

            {/* Input Box */}
            <div className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg p-3 flex gap-3 items-center shadow-sm">
                <input
                    type="text"
                    placeholder="What's on your mind about BABA?"
                    className="flex-1 bg-transparent border-none outline-none text-sm text-[#131722] dark:text-[#d1d4dc] placeholder-[#787b86]"
                />
                <button className="bg-[#131722] hover:bg-[#2a2e39] text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
                    Post
                </button>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
                {MOCK_FORUM_POSTS.map(post => (
                    <div key={post.id} className="border-b border-[#e0e3eb] dark:border-[#2a2e39] pb-6 last:border-0 last:pb-0">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                                    {post.author.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">{post.author}</span>
                                    <span className="text-xs text-[#787b86]/80">//</span>
                                    <span className="text-xs text-[#787b86]">{post.time}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#131722] dark:text-[#d1d4dc] px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span>
                                    {post.ticker}
                                </span>
                                <p className="text-sm text-[#131722] dark:text-[#d1d4dc]">{post.content}</p>
                            </div>
                            {post.imageUrl && <a href="#" className="text-xs text-blue-500 hover:underline block mb-2">tradingview.com/x/JSQ0GJfQ</a>}
                        </div>

                        {/* Image Attachment (Chart) */}
                        {post.imageUrl && (
                            <ChartImagePlaceholder ticker={post.ticker} />
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#1e222d] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] transition-colors">
                                    <Icons.Rocket className="w-4 h-4 text-[#131722] dark:text-[#d1d4dc]" />
                                    <span className="text-xs font-bold text-[#131722] dark:text-[#d1d4dc]">{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-1.5 hover:text-[#2962ff] transition-colors">
                                    <Icons.Message className="w-4 h-4 text-[#787b86]" />
                                    <span className="text-xs font-bold text-[#131722] dark:text-[#d1d4dc]">{post.replies}</span>
                                </button>
                            </div>
                            <button className="text-[#787b86] hover:text-[#131722] dark:hover:text-[#d1d4dc]">
                                <Icons.More className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForumView;
