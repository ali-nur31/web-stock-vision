import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-obsidian text-white transition-colors duration-300 dark:bg-obsidian dark:text-white bg-white text-black">
            <div className="container mx-auto p-4 md:p-6 lg:p-8 h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default Layout;
