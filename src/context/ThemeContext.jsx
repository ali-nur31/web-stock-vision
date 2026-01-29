import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    
    const theme = 'dark';
    const toggleTheme = () => { }; 

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.add('dark');
        localStorage.setItem('stockvision-theme', 'dark');
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
