import { StockData, NewsItem, ChartPoint, EconomicEvent } from './types';

export const MOCK_STOCKS: StockData[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: 2.15, changePercent: 1.25, volume: '52M', marketCap: '2.7T', sector: 'Technology' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: -12.40, changePercent: -1.40, volume: '45M', marketCap: '2.1T', sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.10, change: 1.80, changePercent: 0.43, volume: '22M', marketCap: '3.1T', sector: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com', price: 178.22, change: 0.95, changePercent: 0.54, volume: '33M', marketCap: '1.8T', sector: 'Consumer Cyclical' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 148.48, change: -0.50, changePercent: -0.34, volume: '28M', marketCap: '1.9T', sector: 'Communication' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 175.34, change: 5.20, changePercent: 3.05, volume: '98M', marketCap: '550B', sector: 'Automotive' },
];

export const MOCK_INDICES = [
    { name: 'S&P 500', value: 5234.18, change: 12.40, changePercent: 0.24 },
    { name: 'Nasdaq 100', value: 18339.44, change: 64.20, changePercent: 0.35 },
    { name: 'Dow Jones', value: 39512.13, change: -45.10, changePercent: -0.11 },
    { name: 'Russell 2000', value: 2074.11, change: 10.55, changePercent: 0.51 },
    { name: 'VIX', value: 13.05, change: -0.25, changePercent: -1.88 },
];

export const MOCK_NEWS: NewsItem[] = [
    { id: '1', title: 'Fed Signals Potential Rate Cuts Later This Year', source: 'Financial Times', time: '2h ago', summary: 'The Federal Reserve kept interest rates steady but signaled that inflation is moving towards the 2% target.', sentiment: 'bullish', category: 'Economy', imageUrl: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: '2', title: 'Tech Sector Faces Headwinds Amid Regulatory Scrutiny', source: 'Bloomberg', time: '4h ago', summary: 'New antitrust investigations in the EU and US are causing uncertainty for major tech conglomerates.', sentiment: 'bearish', category: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: '3', title: 'Oil Prices Surge as Geopolitical Tensions Rise', source: 'Reuters', time: '5h ago', summary: 'Brent crude topped $85 a barrel following supply disruption concerns.', sentiment: 'neutral', category: 'Commodities' },
    { id: '4', title: 'Bitcoin Reclaims $70,000 Level Ahead of Halving', source: 'CoinDesk', time: '1h ago', summary: 'Crypto markets are rallying as ETF inflows continue to break records.', sentiment: 'bullish', category: 'Crypto' },
    { id: '5', title: 'European Markets Close Mixed as ECB Holds Rates', source: 'CNBC', time: '30m ago', summary: 'The Stoxx 600 index closed slightly lower despite strong earnings from luxury retailers.', sentiment: 'neutral', category: 'Markets' },
];

export const MOCK_CALENDAR: EconomicEvent[] = [
    { time: '08:30', currency: 'USD', event: 'Core PCE Price Index (MoM)', importance: 'high', forecast: '0.3%', previous: '0.4%' },
    { time: '08:30', currency: 'USD', event: 'Personal Spending (MoM)', importance: 'medium', forecast: '0.4%', previous: '0.2%' },
    { time: '10:00', currency: 'USD', event: 'Michigan Consumer Sentiment', importance: 'medium', forecast: '76.5', previous: '76.9' },
    { time: '11:30', currency: 'EUR', event: 'ECB President Lagarde Speaks', importance: 'high', forecast: '', previous: '' },
];

// Generate simple mock chart data
export const generateChartData = (days: number): ChartPoint[] => {
    const data: ChartPoint[] = [];
    let value = 150;
    const now = new Date();
    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const change = (Math.random() - 0.48) * 5; // Slight upward trend bias
        value += change;
        data.push({
            date: date.toISOString().split('T')[0],
            value: Number(value.toFixed(2)),
        });
    }
    return data;
};
