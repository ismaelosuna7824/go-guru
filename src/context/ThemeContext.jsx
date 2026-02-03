import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const FONT_SIZES = {
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 20
};

export function ThemeProvider({ children }) {
    // Theme state
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    // Font size state
    const [fontSize, setFontSize] = useState(() => {
        const savedSize = localStorage.getItem('fontSize');
        return savedSize || 'medium';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.style.setProperty('--content-font-size', `${FONT_SIZES[fontSize]}px`);
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const cycleFontSize = () => {
        const sizes = Object.keys(FONT_SIZES);
        const currentIndex = sizes.indexOf(fontSize);
        const nextIndex = (currentIndex + 1) % sizes.length;
        setFontSize(sizes[nextIndex]);
    };

    const setFontSizeByName = (sizeName) => {
        if (FONT_SIZES[sizeName]) {
            setFontSize(sizeName);
        }
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
            fontSize,
            fontSizeValue: FONT_SIZES[fontSize],
            cycleFontSize,
            setFontSize: setFontSizeByName,
            fontSizeOptions: Object.keys(FONT_SIZES)
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
