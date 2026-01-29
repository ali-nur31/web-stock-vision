import React, { createContext, useContext, useState, useEffect } from 'react';
import { resolveSymbolName } from '../utils/helpers';
import { generateMockCandles, generateMockQuote } from '../utils/mockData';

const StockContext = createContext();

const API_KEY = import.meta.env.VITE_FINNHUB_KEY;

export const StockProvider = ({ children }) => {
    const [symbol, setSymbol] = useState('AAPL');
    const [quote, setQuote] = useState(null);
    const [stockHistory, setStockHistory] = useState([]);
    const [resolution, setResolution] = useState('D');
    const [loading, setLoading] = useState(false);
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('stockvision-watchlist');
        return saved ? JSON.parse(saved) : ['AAPL', 'TSLA', 'NVDA', 'MSFT'];
    });

    const [watchlistQuotes, setWatchlistQuotes] = useState({});

    // Watchlist Data Fetching
    useEffect(() => {
        localStorage.setItem('stockvision-watchlist', JSON.stringify(watchlist));

        const fetchWatchlistData = async () => {
            const newQuotes = {};
            await Promise.all(watchlist.map(async (sym) => {
                try {
                    let data = null;
                    if (API_KEY) {
                        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=${API_KEY}`);
                        data = await response.json();
                    }

                    if (data && data.c) {
                        newQuotes[sym] = data;
                    } else {
                        // Fallback to mock
                        newQuotes[sym] = generateMockQuote(sym);
                    }
                } catch (e) {
                    newQuotes[sym] = generateMockQuote(sym);
                }
            }));
            setWatchlistQuotes(newQuotes);
        };

        fetchWatchlistData();
        const interval = setInterval(fetchWatchlistData, 60000);
        return () => clearInterval(interval);
    }, [watchlist]);

    const searchStocks = async (query) => {
        try {
            if (!API_KEY) throw new Error('No API Key');
            const response = await fetch(`https://finnhub.io/api/v1/search?q=${query}&token=${API_KEY}`);
            const data = await response.json();

            if (data.result) {
                return data.result.slice(0, 10);
            }
            return [];
        } catch (error) {
            // Return empty for search if API fails, or maybe a few mock hits?
            // Let's stick to empty or basic mock to not confuse too much
            return [
                { description: 'Apple Inc', displaySymbol: 'AAPL', symbol: 'AAPL' },
                { description: 'Tesla Inc', displaySymbol: 'TSLA', symbol: 'TSLA' },
                { description: 'Microsoft Corp', displaySymbol: 'MSFT', symbol: 'MSFT' },
            ].filter(s => s.symbol.includes(query.toUpperCase()));
        }
    };

    const fetchQuote = async (sym) => {
        try {
            if (!API_KEY) throw new Error('No API Key');
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=${API_KEY}`);
            const data = await response.json();

            if (!data.c) throw new Error('Invalid data');
            return data;
        } catch (error) {
            return generateMockQuote(sym);
        }
    };

    const fetchHistory = async (sym, res) => {
        try {
            if (!API_KEY) throw new Error('No API Key');

            // Calculate timestamps
            const end = Math.floor(Date.now() / 1000);
            let start;
            switch (res) {
                case 'D': start = end - (30 * 24 * 60 * 60); break;
                case 'W': start = end - (12 * 7 * 24 * 60 * 60); break;
                case 'M': start = end - (12 * 30 * 24 * 60 * 60); break;
                default: start = end - (30 * 24 * 60 * 60);
            }

            const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${sym}&resolution=${res}&from=${start}&to=${end}&token=${API_KEY}`);
            const data = await response.json();

            if (data.s === 'ok') {
                return data.c.map((c, i) => ({
                    c,
                    o: data.o[i],
                    h: data.h[i],
                    l: data.l[i],
                    v: data.v[i],
                    t: data.t[i]
                }));
            }
            throw new Error('No data');
        } catch (error) {
            return generateMockCandles(sym, 30);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const q = await fetchQuote(symbol);
            const h = await fetchHistory(symbol, resolution);

            setQuote(q);
            setStockHistory(h);
            setLoading(false);
        };
        loadData();
    }, [symbol, resolution]);

    const addToWatchlist = (sym) => {
        if (!watchlist.includes(sym)) setWatchlist([...watchlist, sym]);
    };

    const removeFromWatchlist = (sym) => {
        setWatchlist(watchlist.filter((s) => s !== sym));
    };

    return (
        <StockContext.Provider value={{
            symbol,
            setSymbol,
            quote,
            stockHistory,
            resolution,
            setResolution,
            loading,
            watchlist,
            watchlistQuotes,
            addToWatchlist,
            removeFromWatchlist,
            resolveSymbolName,
            searchStocks,
        }}>
            {children}
        </StockContext.Provider>
    );
};

export const useStock = () => useContext(StockContext);
