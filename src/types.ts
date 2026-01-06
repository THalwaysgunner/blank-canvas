export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
}

export interface ChartPoint {
  date: string;
  value: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  summary: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  category?: string;
  imageUrl?: string;
}

export type ViewState = 'home' | 'dashboard' | 'markets' | 'research' | 'ai-analyst' | 'my-researches' | 'settings';

export interface AIAnalysisResult {
  summary: string;
  bullCase: string[];
  bearCase: string[];
  rating: string;
}

export interface EconomicEvent {
  time: string;
  currency: string;
  event: string;
  importance: 'high' | 'medium' | 'low';
  actual?: string;
  forecast: string;
  previous: string;
}
