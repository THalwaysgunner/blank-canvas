import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartPoint } from '@/types';

interface ChartWidgetProps {
    data: ChartPoint[];
    color?: string;
    height?: number;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ data, color = "#2962FF", height }) => {
    const isPositive = data.length > 0 && data[data.length - 1].value >= data[0].value;
    const strokeColor = color === "#2962FF" ? (isPositive ? "#00BFA5" : "#F23645") : color;

    return (
        <div className="w-full h-full select-none" style={{ height: height ? `${height}px` : '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id={`colorValue-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2e39" opacity={0.3} />
                    <XAxis
                        dataKey="date"
                        hide={true}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        orientation="right"
                        tick={{ fontSize: 11, fill: '#787b86' }}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#131722',
                            borderColor: '#2a2e39',
                            color: '#d1d4dc',
                            fontSize: '12px',
                            borderRadius: '2px',
                            padding: '8px'
                        }}
                        itemStyle={{ color: '#d1d4dc' }}
                        labelStyle={{ display: 'none' }}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                        cursor={{ stroke: '#2a2e39', strokeDasharray: '3 3' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={strokeColor}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#colorValue-${color})`}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartWidget;
