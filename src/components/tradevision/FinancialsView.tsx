import React, { useState } from 'react';
import { Icons } from './Icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, ComposedChart, Line } from 'recharts';

type FinancialSubTab = 'income-statement' | 'balance-sheet' | 'cash-flow' | 'ratios' | 'dividends' | 'earnings' | 'forecast';

const FINANCIAL_TABS: { key: FinancialSubTab; label: string }[] = [
    { key: 'income-statement', label: 'Income Statement' },
    { key: 'balance-sheet', label: 'Balance Sheet' },
    { key: 'cash-flow', label: 'Cash Flow' },
    { key: 'ratios', label: 'Ratios' },
    { key: 'dividends', label: 'Dividends' },
    { key: 'earnings', label: 'Earnings' },
    { key: 'forecast', label: 'Forecast' },
];

const FinancialsView: React.FC = () => {
    const [activeSubTab, setActiveSubTab] = useState<FinancialSubTab>('income-statement');

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden">
            {/* Sub-Navigation */}
            <div className="border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                <div className="flex overflow-x-auto px-4">
                    {FINANCIAL_TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveSubTab(tab.key)}
                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                                ${activeSubTab === tab.key
                                    ? 'border-[#2962ff] text-[#2962ff]'
                                    : 'border-transparent text-[#787b86] hover:text-[#131722] dark:hover:text-[#d1d4dc]'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
                {activeSubTab === 'income-statement' && <IncomeStatement />}
                {activeSubTab === 'balance-sheet' && <IncomeStatement title="Balance Sheet" />} {/* Reusing structure for now */}
                {activeSubTab === 'cash-flow' && <IncomeStatement title="Cash Flow" />} {/* Reusing structure for now */}
                {activeSubTab === 'ratios' && <Ratios />}
                {activeSubTab === 'dividends' && <Dividends />}
                {activeSubTab === 'earnings' && <Earnings />}
                {activeSubTab === 'forecast' && <Forecast />}
            </div>
        </div>
    );
};

// --- Sub-Components ---

// 1. Income Statement / Balance Sheet / Cash Flow (Table Layout)
// Mimics image 1: Rows of financial data, toggle for Annual/Quarterly
const IncomeStatement: React.FC<{ title?: string }> = ({ title = "Income Statement" }) => {
    const [period, setPeriod] = useState<'Annual' | 'Quarterly'>('Annual');

    // Mock Data mimicking the image structure
    const years = ['2021', '2022', '2023', '2024', '2025 (TTM)'];
    const rows = [
        { label: 'Total Revenues', values: ['365,817', '394,328', '383,285', '391,035', '416,161'], bold: true },
        { label: 'Total Revenues Growth', values: ['+33.26%', '+7.79%', '-2.8%', '+2.02%', '+6.43%'], color: true },
        { label: 'Cost Of Revenues', values: ['212,981', '223,546', '214,137', '210,352', '220,960'] },
        { label: 'Gross Profit', values: ['152,836', '170,782', '169,148', '180,683', '195,201'], bold: true },
        { label: 'Gross Profit Growth', values: ['+45.62%', '+11.74%', '-0.96%', '+6.82%', '+8.04%'], color: true },
        { label: 'Gross Profit Margin %', values: ['41.78%', '43.31%', '44.13%', '46.21%', '46.91%'] },
        { label: 'Other Operating Expenses, Total', values: ['43,887', '51,345', '54,847', '57,467', '62,151'], bold: true },
        { label: 'R&D Expenses', values: ['21,914', '26,251', '29,915', '31,370', '34,550'] },
        { label: 'Operating Income', values: ['108,949', '119,437', '114,301', '123,216', '133,050'], bold: true },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc] flex items-center gap-2">
                    AAPL {title} <Icons.Info className="w-4 h-4 text-[#787b86]" />
                </h2>
                <div className="flex bg-[#f0f3fa] dark:bg-[#2a2e39] rounded p-1">
                    {['Annual', 'Quarterly'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p as any)}
                            className={`px-4 py-1.5 text-sm font-medium rounded transition-all ${period === p
                                    ? 'bg-white dark:bg-[#1e222d] text-[#131722] dark:text-[#d1d4dc] shadow-sm'
                                    : 'text-[#787b86] hover:text-[#131722] dark:hover:text-[#d1d4dc]'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                            <th className="py-3 px-4 text-left text-xs font-semibold text-[#787b86] uppercase tracking-wider w-[250px]">
                                Period Ending:
                            </th>
                            {years.map(year => (
                                <th key={year} className="py-3 px-4 text-right text-xs font-semibold text-[#787b86] uppercase tracking-wider">
                                    {year}
                                    <div className="text-[10px] font-normal mt-1 opacity-70">30/09</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39]">
                        {rows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50 transition-colors">
                                <td className={`py-3 px-4 text-sm ${row.bold ? 'font-bold text-[#131722] dark:text-[#d1d4dc]' : 'text-[#131722] dark:text-[#e0e3eb]'}`}>
                                    {row.label}
                                </td>
                                {row.values.map((val, vIdx) => (
                                    <td key={vIdx} className={`py-3 px-4 text-right text-sm font-medium
                                        ${row.color
                                            ? (val.startsWith('+') ? 'text-[#00bfa5]' : val.startsWith('-') ? 'text-[#f23645]' : 'text-[#131722] dark:text-[#d1d4dc]')
                                            : 'text-[#131722] dark:text-[#d1d4dc]'
                                        }
                                        ${row.bold && !row.color ? 'font-bold' : ''}
                                    `}>
                                        {val}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 2. Ratios
// Mimics image 2: Grouped list of key-value pairs
const Ratios: React.FC = () => {
    const groups = [
        {
            title: 'Valuation Ratios',
            items: [
                { name: 'P/E Ratio TTM', company: '35.78', industry: '32.66' },
                { name: 'Price to Sales TTM', company: '9.65', industry: '2.42' },
                { name: 'Price to Cash Flow MRQ', company: '36.03', industry: '32.14' },
                { name: 'Price to Free Cash Flow TTM', company: '50.93', industry: '39.98' },
                { name: 'Price to Book MRQ', company: '54.47', industry: '0.42' },
            ]
        },
        {
            title: 'Profitability',
            items: [
                { name: 'Gross margin TTM', company: '46.91%', industry: '43.18%' },
                { name: 'Operating margin TTM', company: '31.97%', industry: '8.76%' },
                { name: 'Net Profit margin TTM', company: '26.92%', industry: '7.11%' },
            ]
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc]">AAPL Ratios</h2>
            </div>

            <div className="space-y-8">
                {groups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-sm font-semibold text-[#131722] dark:text-[#e0e3eb] mb-4 flex items-center gap-2">
                            <Icons.ChevronDown className="w-4 h-4" /> {group.title}
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                                        <th className="text-left py-2 px-4 text-xs font-semibold text-[#787b86]">Name</th>
                                        <th className="text-right py-2 px-4 text-xs font-semibold text-[#787b86]">Company</th>
                                        <th className="text-right py-2 px-4 text-xs font-semibold text-[#787b86]">Industry</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39]">
                                    {group.items.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50">
                                            <td className="py-3 px-4 text-sm text-[#131722] dark:text-[#d1d4dc] font-medium">{item.name}</td>
                                            <td className="py-3 px-4 text-right text-sm text-[#131722] dark:text-[#d1d4dc]">{item.company}</td>
                                            <td className="py-3 px-4 text-right text-sm text-[#131722] dark:text-[#d1d4dc]">{item.industry}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. Dividends
// Mimics image 3: Doughnut chart + table
const Dividends: React.FC = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc]">AAPL Ex Dividend Date, Yield & Dividend History</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#f8f9fd] dark:bg-[#2a2e39]/30 rounded-lg">
                <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 rounded-full border-8 border-[#e0e3eb] dark:border-[#2a2e39] flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-8 border-[#2962ff] border-r-transparent border-b-transparent rotate-45" />
                        <span className="text-sm font-bold text-[#131722] dark:text-[#d1d4dc]">13.77%</span>
                    </div>
                    <div>
                        <div className="text-xs text-[#787b86] font-semibold mb-1">Payout Ratio</div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-[#2962ff]" />
                            <span className="text-sm text-[#131722] dark:text-[#d1d4dc]">Payout ratio (TTM)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#e0e3eb]" />
                            <span className="text-sm text-[#131722] dark:text-[#d1d4dc]">Earnings retained</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="text-xs text-[#787b86] font-semibold">Dividend Yield</div>
                        <div className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc]">0.39% <span className="text-xs font-normal text-[#787b86] ml-2">| Industry Median 0.50%</span></div>
                    </div>
                    <div>
                        <div className="text-xs text-[#787b86] font-semibold">Annualized Payout</div>
                        <div className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc]">1.04 <span className="text-xs font-normal text-[#787b86] ml-2">| Paid quarterly</span></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="text-xs text-[#787b86] font-semibold">5-Years Growth</div>
                        <div className="text-lg font-bold text-[#00bfa5]">+5.11%</div>
                    </div>
                    <div>
                        <div className="text-xs text-[#787b86] font-semibold">Growth Streak</div>
                        <div className="text-sm text-[#131722] dark:text-[#d1d4dc] flex items-center gap-1">
                            <Icons.Lock className="w-3 h-3" />
                            <span>Unlock</span>
                        </div>
                    </div>
                </div>
            </div>

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-[#e0e3eb] dark:border-[#2a2e39] text-left">
                        <th className="py-3 font-semibold text-[#787b86]">Ex-Dividend Date</th>
                        <th className="py-3 font-semibold text-[#787b86] text-right">Dividend</th>
                        <th className="py-3 font-semibold text-[#787b86] text-right">Payment Date</th>
                        <th className="py-3 font-semibold text-[#787b86] text-right">Yield</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39]">
                    {[
                        { date: 'Nov 10, 2025', div: '0.26', pay: 'Nov 13, 2025', yield: '0.39%' },
                        { date: 'Aug 11, 2025', div: '0.26', pay: 'Aug 14, 2025', yield: '0.45%' },
                        { date: 'May 12, 2025', div: '0.26', pay: 'May 15, 2025', yield: '0.52%' },
                        { date: 'Feb 10, 2025', div: '0.25', pay: 'Feb 13, 2025', yield: '0.44%' },
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50">
                            <td className="py-3 font-semibold text-[#131722] dark:text-[#d1d4dc]">{row.date}</td>
                            <td className="py-3 text-right text-[#131722] dark:text-[#d1d4dc]">{row.div}</td>
                            <td className="py-3 text-right text-[#131722] dark:text-[#d1d4dc]">{row.pay}</td>
                            <td className="py-3 text-right text-[#131722] dark:text-[#d1d4dc]">{row.yield}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// 4. Forecast
const Forecast: React.FC = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc] mb-6">Apple (AAPL) Stock Forecast & Price Target</h2>

            <div className="flex gap-8 items-start mb-8">
                <div className="w-48 text-center flex-shrink-0">
                    <div className="text-xs text-[#787b86] mb-2">Overall Consensus</div>
                    <div className="bg-[#e8f5e9] text-[#00bfa5] font-bold py-1 rounded mb-4">Buy</div>
                    <div className="relative w-32 h-32 mx-auto rounded-full border-8 border-[#00bfa5] flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#131722] dark:text-[#d1d4dc]">49</div>
                            <div className="text-[10px] text-[#787b86]">Ratings</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="mb-4">
                        <div className="text-xs text-[#787b86]">Analysts 12-Month Price Target</div>
                        <div className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc] flex items-center gap-2">
                            Average 287.71 <span className="text-[#00bfa5] text-sm">(+9.71% Upside)</span>
                        </div>
                    </div>
                    {/* Placeholder for complex forecast chart */}
                    <div className="h-64 bg-[#f8f9fd] dark:bg-[#2a2e39]/50 rounded border border-[#e0e3eb] dark:border-[#2a2e39] flex items-center justify-center text-[#787b86]">
                        Forecast Chart Placeholder (Needs Recharts implementation)
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-[#131722] dark:text-[#d1d4dc] mb-4">Analyst Ratings</h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#e0e3eb] dark:border-[#2a2e39] text-left">
                            <th className="py-2 text-[#787b86]">Firm</th>
                            <th className="py-2 text-[#787b86]">Position</th>
                            <th className="py-2 text-[#787b86] text-right">Price Target</th>
                            <th className="py-2 text-[#787b86] text-right">Upside / Downside</th>
                            <th className="py-2 text-[#787b86] text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39]">
                        <tr className="hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50">
                            <td className="py-3 font-semibold text-[#131722] dark:text-[#d1d4dc]">UBS</td>
                            <td className="py-3 text-[#131722] dark:text-[#d1d4dc]">Hold</td>
                            <td className="py-3 text-right font-medium text-[#131722] dark:text-[#d1d4dc]">280.00</td>
                            <td className="py-3 text-right text-[#00bfa5] font-medium">+6.77%</td>
                            <td className="py-3 text-right text-[#131722] dark:text-[#d1d4dc]">Jan 06, 2026</td>
                        </tr>
                        <tr className="hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50">
                            <td className="py-3 font-semibold text-[#131722] dark:text-[#d1d4dc]">BofA Securities</td>
                            <td className="py-3 text-[#00bfa5] font-medium">Buy</td>
                            <td className="py-3 text-right font-medium text-[#131722] dark:text-[#d1d4dc]">325.00</td>
                            <td className="py-3 text-right text-[#00bfa5] font-medium">+23.93%</td>
                            <td className="py-3 text-right text-[#131722] dark:text-[#d1d4dc]">Jan 06, 2026</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 5. Earnings
const Earnings: React.FC = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#131722] dark:text-[#d1d4dc]">Apple (AAPL) Earnings Dates & Reports</h2>

            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-[#f8f9fd] dark:bg-[#2a2e39]/30 rounded">
                    <div className="text-xs text-[#787b86] mb-1">Latest Release</div>
                    <div className="font-bold text-[#131722] dark:text-[#d1d4dc]">Oct 30, 2025</div>
                </div>
                <div className="p-4 bg-[#f8f9fd] dark:bg-[#2a2e39]/30 rounded">
                    <div className="text-xs text-[#787b86] mb-1">EPS / Forecast</div>
                    <div className="font-bold text-[#00bfa5]">1.85 <span className="text-[#787b86] text-sm font-normal">/ 1.76</span></div>
                </div>
                <div className="p-4 bg-[#f8f9fd] dark:bg-[#2a2e39]/30 rounded">
                    <div className="text-xs text-[#787b86] mb-1">Revenue / Forecast</div>
                    <div className="font-bold text-[#00bfa5]">102.50B <span className="text-[#787b86] text-sm font-normal">/ 101.69B</span></div>
                </div>
            </div>

            <div className="h-[300px] border border-[#e0e3eb] dark:border-[#2a2e39] rounded p-4 flex items-center justify-center text-[#787b86]">
                Earnings Chart Placeholder (Bar Chart with Revenue/EPS)
            </div>

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-[#e0e3eb] dark:border-[#2a2e39] text-left">
                        <th className="py-3 font-semibold text-[#787b86]">Release Date</th>
                        <th className="py-3 font-semibold text-[#787b86]">Period End</th>
                        <th className="py-3 font-semibold text-[#787b86]">EPS / Forecast</th>
                        <th className="py-3 font-semibold text-[#787b86]">Revenue / Forecast</th>
                        <th className="py-3 font-semibold text-[#787b86] text-right">EPS Surprise</th>
                        <th className="py-3 font-semibold text-[#787b86] text-right">Revenue Surprise</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39]">
                    <tr className="hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50">
                        <td className="py-4 text-[#131722] dark:text-[#d1d4dc]">Oct 30, 2025</td>
                        <td className="py-4 text-[#131722] dark:text-[#d1d4dc]">09/2025</td>
                        <td className="py-4 text-[#131722] dark:text-[#d1d4dc]"><span className="text-[#00bfa5] font-medium">1.85</span> / 1.76</td>
                        <td className="py-4 text-[#131722] dark:text-[#d1d4dc]"><span className="text-[#00bfa5] font-medium">102.5B</span> / 101.69B</td>
                        <td className="py-4 text-right text-[#00bfa5] font-medium">+5.11%</td>
                        <td className="py-4 text-right text-[#00bfa5] font-medium">+0.8%</td>
                    </tr>
                    <tr className="hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50">
                        <td className="py-4 text-[#131722] dark:text-[#d1d4dc]">Jul 31, 2025</td>
                        <td className="py-4 text-[#131722] dark:text-[#d1d4dc]">06/2025</td>
                        <td className="py-4 text-[#131722] dark:text-[#d1d4dc]"><span className="text-[#00bfa5] font-medium">1.57</span> / 1.42</td>
                        <td className="py-4 text-[#131722] dark:text-[#d1d4dc]"><span className="text-[#00bfa5] font-medium">94.04B</span> / 89B</td>
                        <td className="py-4 text-right text-[#00bfa5] font-medium">+10.56%</td>
                        <td className="py-4 text-right text-[#00bfa5] font-medium">+5.66%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FinancialsView;
