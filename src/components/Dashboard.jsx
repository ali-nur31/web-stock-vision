import React from 'react';
import Header from './Header';
import Watchlist from './Watchlist';
import StockChart from './StockChart';
import NewsFeed from './NewsFeed';

const Dashboard = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden gap-6 h-full pb-4">
                <Watchlist />
                <main className="flex-1 min-w-0 bg-gray-900/50 rounded-xl border border-gray-800 p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                    <StockChart />
                </main>
                <NewsFeed />
            </div>
        </>
    );
};

export default Dashboard;
