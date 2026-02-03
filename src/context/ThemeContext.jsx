import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const FONT_SIZES = {
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 20
};

const THEMES = ['dark', 'light', 'cyberpunk', 'kanagawa', 'dracula', 'nord'];

const THEME_LABELS = {
    dark: 'Oscuro',
    light: 'Claro',
    cyberpunk: 'Cyberpunk',
    kanagawa: 'Kanagawa',
    dracula: 'Dracula',
    nord: 'Nord'
};

const THEME_ICONS = {
    dark: 'dark_mode',
    light: 'light_mode',
    cyberpunk: 'electric_bolt',
    kanagawa: 'waves',
    dracula: 'nights_stay',
    nord: 'ac_unit'
};

export function ThemeProvider({ children }) {
    // Theme state
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && THEMES.includes(savedTheme)) return savedTheme;
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

    const cycleTheme = () => {
        const currentIndex = THEMES.indexOf(theme);
        const nextIndex = (currentIndex + 1) % THEMES.length;
        setTheme(THEMES[nextIndex]);
    };

    // Keep toggleTheme for backwards compatibility
    const toggleTheme = cycleTheme;

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
            themeLabel: THEME_LABELS[theme],
            themeIcon: THEME_ICONS[theme],
            themes: THEMES,
            themeLabels: THEME_LABELS,
            toggleTheme,
            cycleTheme,
            setTheme,
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
