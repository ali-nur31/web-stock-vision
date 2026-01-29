import React from 'react';
import { useStock } from '../context/StockContext';
import { formatCurrency, formatPercentage } from '../utils/helpers';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';

const Watchlist = () => {
    const { watchlist, setSymbol, symbol, removeFromWatchlist, watchlistQuotes, quote } = useStock();

    return (
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4 overflow-y-auto pr-2 border-r border-gray-800 dark:border-gray-800 border-gray-200">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 font-mono mb-2">Watchlist</h2>
            {watchlist.map((item) => {
                // If the item is the currently selected symbol, use the robust 'quote' from context
                // Otherwise use the sidebar-specific fetch result
                const displayQuote = (symbol === item && quote && (quote.c || quote.pc))
                    ? quote
                    : (watchlistQuotes ? watchlistQuotes[item] : null);

                return (
                    <div
                        key={item}
                        className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all border ${symbol === item
                            ? 'border-neon-green bg-neon-green/10'
                            : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-900'
                            }`}
                        onClick={() => setSymbol(item)}
                    >
                        <div>
                            <span className="block font-bold font-mono">{item}</span>
                            <span className={`text-xs font-mono font-bold ${displayQuote?.dp > 0 ? 'text-neon-green' : displayQuote?.dp < 0 ? 'text-neon-red' : 'text-gray-500'
                                }`}>
                                {displayQuote && (displayQuote.c || displayQuote.pc) ? formatCurrency(displayQuote.c || displayQuote.pc) : '---'}
                            </span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFromWatchlist(item);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                )
            })}
            {watchlist.length === 0 && (
                <div className="text-center text-gray-500 text-xs py-4 font-mono">
                    NO DATA
                </div>
            )}
        </aside>
    );
};

export default Watchlist;
