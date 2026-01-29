import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useStock } from '../context/StockContext';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency, resolveSymbolName } from '../utils/helpers';
import { Loader2 } from 'lucide-react';

const StockChart = () => {
    const { quote, stockHistory, symbol, resolution, setResolution, loading, addToWatchlist, watchlist } = useStock();
    const { theme } = useTheme();

    const isPositive = useMemo(() => {
        if (!stockHistory || stockHistory.length < 2) return true;
        const first = stockHistory[0].c;
        const last = stockHistory[stockHistory.length - 1].c;
        return last >= first;
    }, [stockHistory]);

    const chartColor = isPositive ? '#39FF14' : '#FF3131';

    const data = useMemo(() => {
        return stockHistory.map(item => ({
            ...item,
            date: new Date(item.t * 1000).toLocaleDateString(),
            time: new Date(item.t * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }));
    }, [stockHistory]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-2 border bg-obsidian border-gray-700 rounded shadow-lg">
                    <p className="text-xs font-mono mb-1 text-gray-400">{payload[0].payload.date} {payload[0].payload.time}</p>
                    <p className="text-sm font-bold font-mono" style={{ color: chartColor }}>
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (loading && !quote) {
        return (
            <div className="h-full flex items-center justify-center text-neon-green">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pl-2">
                <div>
                    <div className="flex items-baseline gap-4">
                        <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter" style={{ color: chartColor }}>
                            {quote ? formatCurrency(quote.c) : '---'}
                        </h1>
                        <span className={`text-lg font-mono font-bold ${quote?.d >= 0 ? 'text-neon-green' : 'text-neon-red'}`} style={{ color: chartColor }}>
                            {quote ? `${quote.d >= 0 ? '+' : ''}${quote.d} (${quote.dp}%)` : ''}
                        </span>
                    </div>
                    <h2 className="text-gray-500 font-mono text-sm mt-1">{resolveSymbolName(symbol)}</h2>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
                        {['D', 'W', 'M', '1Y'].map((res) => (
                            <button
                                key={res}
                                onClick={() => setResolution(res)}
                                className={`px-3 py-1 rounded text-xs font-bold font-mono transition-all ${resolution === res
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                {res}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => addToWatchlist(symbol)}
                        className={`px-4 py-2 rounded font-bold font-mono text-xs border transition-colors ${watchlist.includes(symbol)
                            ? 'bg-transparent text-gray-500 border-gray-800 cursor-default'
                            : 'bg-neon-green/10 text-neon-green border-neon-green hover:bg-neon-green/20'
                            }`}
                    >
                        {watchlist.includes(symbol) ? 'WATCHING' : '+ WATCH'}
                    </button>
                </div>
            </div>

            <div className="w-full h-[400px] min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            hide
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            hide
                            orientation="right"
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'gray', strokeDasharray: '3 3' }} />
                        <Area
                            type="monotone"
                            dataKey="c"
                            stroke={chartColor}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            isAnimationActive={true}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StockChart;
