import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState({
        primary: '#06b6d4',      // cyan-500
        secondary: '#a855f7',    // purple-500
        accent: '#22d3ee',       // cyan-400
        textGlow: 'rgba(34, 211, 238, 0.6)',
        name: 'cyan'
    });

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
