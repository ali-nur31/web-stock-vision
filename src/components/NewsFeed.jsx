import React from 'react';

const NewsFeed = () => {

    const news = [
        { id: 1, headline: "Market Rally Continues as Tech Stocks Soar", source: "Bloomberg", time: "2h ago", url: "https://www.bloomberg.com" },
        { id: 2, headline: "Fed Signals Potential Rate Cuts in Late 2024", source: "CNBC", time: "4h ago", url: "https://www.cnbc.com" },
        { id: 3, headline: "Oil Prices Dip Amid Global Demand Concerns", source: "Reuters", time: "5h ago", url: "https://www.reuters.com" },
        { id: 4, headline: "Earnings Report: Simple beats expectations", source: "Yahoo Finance", time: "6h ago", url: "https://finance.yahoo.com" },
        { id: 5, headline: "Crypto volatility returns with Bitcoin surge", source: "CoinDesk", time: "8h ago", url: "https://www.coindesk.com" },
    ];

    return (
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-800 dark:border-gray-800 border-gray-200 p-4 h-full overflow-y-auto">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 font-mono mb-4">Latest News</h2>
            <div className="space-y-6">
                {news.map((item) => (
                    <a
                        key={item.id}
                        href={item.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group cursor-pointer hover:bg-gray-900/50 p-2 rounded transition-colors"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-neon-green font-mono">{item.source}</span>
                            <span className="text-xs text-gray-500">{item.time}</span>
                        </div>
                        <h3 className="text-sm font-bold leading-tight group-hover:text-neon-green transition-colors text-gray-200">
                            {item.headline}
                        </h3>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default NewsFeed;
