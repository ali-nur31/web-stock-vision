import React from 'react';
import { Terminal } from 'lucide-react';
import SearchBox from './SearchBox';

const Header = () => {
    return (
        <header className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 border-b border-gray-800 pb-4 dark:border-gray-800 border-gray-200 relative z-50">
            <div className="flex items-center gap-2 text-neon-green">
                <Terminal size={32} />
                <h1 className="text-2xl font-bold tracking-wider font-mono">STOCKVISION__PRO</h1>
            </div>

            <SearchBox />

            <div className="w-10"></div>
        </header>
    );
};

export default Header;
