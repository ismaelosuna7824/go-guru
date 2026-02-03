import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ActivityBar({ activeView, onViewChange, isSidebarOpen, onToggleSidebar }) {
    const { theme, toggleTheme, fontSize, cycleFontSize } = useTheme();

    const topItems = [
        { id: 'search', icon: 'menu', label: 'Search' },
    ];

    const bottomItems = [
        { id: 'font-size', icon: 'text_fields', label: `Font Size: ${fontSize}`, action: cycleFontSize },
        { id: 'theme', icon: theme === 'dark' ? 'light_mode' : 'dark_mode', label: 'Toggle Theme', action: toggleTheme },
    ];

    const handleItemClick = (item) => {
        if (item.action) {
            item.action();
            return;
        }

        if (activeView === item.id) {
            onToggleSidebar();
        } else {
            if (!isSidebarOpen) {
                onToggleSidebar();
            }
            onViewChange(item.id);
        }
    };

    const itemStyle = (isActive) => ({
        width: '48px',
        height: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        color: isActive ? 'var(--vscode-activityBar-fg)' : 'var(--vscode-activityBar-inactiveFg)',
        borderLeft: isActive ? '2px solid var(--vscode-activityBar-fg)' : '2px solid transparent',
        opacity: isActive ? 1 : 0.5,
    });

    return (
        <div style={{
            width: '48px',
            backgroundColor: 'var(--vscode-activityBar-bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--vscode-activityBar-border)',
            userSelect: 'none',
            flexShrink: 0,
            zIndex: 10
        }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {topItems.map(item => (
                    <div
                        key={item.id}
                        style={itemStyle(activeView === item.id && isSidebarOpen)}
                        title={item.label}
                        onClick={() => handleItemClick(item)}
                    >
                        <span className="material-icons" style={{ fontSize: '24px' }}>{item.icon}</span>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {bottomItems.map(item => (
                    <div
                        key={item.id}
                        style={itemStyle(false)}
                        title={item.label}
                        onClick={() => handleItemClick(item)}
                    >
                        <span className="material-icons" style={{ fontSize: '24px' }}>{item.icon}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
