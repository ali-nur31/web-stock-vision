import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useStock } from '../context/StockContext';

const SearchBox = () => {
    const { setSymbol, searchStocks } = useStock();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.trim().length > 0) {
                const hits = await searchStocks(query);
                setResults(hits.slice(0, 7));
                setIsSearching(true);
            } else {
                setResults([]);
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, searchStocks]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setSymbol(query.toUpperCase());
            setQuery('');
            setIsSearching(false);
        }
    };

    const selectResult = (symbol) => {
        setSymbol(symbol);
        setQuery('');
        setIsSearching(false);
    };

    return (
        <form onSubmit={handleSearch} className="flex-1 max-w-md w-full relative z-50">
            <div className="relative group">
                <input
                    type="text"
                    placeholder="ENTER SYMBOL (e.g., AAPL)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-[#050505] border border-gray-800 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-neon-green text-sm font-mono text-white placeholder-gray-600 transition-all shadow-md"
                />
                <Search className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-neon-green transition-colors" size={18} />
            </div>
            {isSearching && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#050505] border border-gray-800 rounded-lg shadow-2xl max-h-60 overflow-y-auto w-full z-50">
                    {results.map((item) => (
                        <button
                            key={item.symbol}
                            type="button"
                            onClick={() => selectResult(item.symbol)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-900 border-b border-gray-800 last:border-0 transition-colors flex items-center justify-between group"
                        >
                            <span className="font-bold font-mono text-neon-green">{item.displaySymbol}</span>
                            <span className="text-xs text-gray-400 group-hover:text-white transition-colors truncate ml-2 max-w-[150px] text-right">
                                {item.description}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </form>
    );
};

export default SearchBox;
