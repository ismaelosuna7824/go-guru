import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';

export default function ActivityBar({ activeView, onViewChange, isSidebarOpen, onToggleSidebar }) {
    const { theme, themeLabel, themeIcon, cycleTheme, fontSize, cycleFontSize } = useTheme();
    const { resetProgress, visitedIds } = useProgress();
    const [showConfirm, setShowConfirm] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleResetProgress = () => {
        if (showConfirm) {
            resetProgress();
            setShowConfirm(false);
        } else {
            setShowConfirm(true);
            // Auto-hide confirm after 3 seconds
            setTimeout(() => setShowConfirm(false), 3000);
        }
    };

    const topItems = [
        { id: 'search', icon: 'menu', label: 'Menu' },
    ];

    const bottomItems = [
        { id: 'reset-progress', icon: showConfirm ? 'warning' : 'restart_alt', label: showConfirm ? '¡Click para confirmar!' : `Reset (${visitedIds.length} vistos)`, action: handleResetProgress, isWarning: showConfirm },
        { id: 'font-size', icon: 'text_fields', label: `Tamaño: ${fontSize}`, action: cycleFontSize },
        { id: 'theme', icon: themeIcon, label: `Tema: ${themeLabel}`, action: cycleTheme },
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

    const itemStyle = (isActive, isWarning = false) => ({
        width: '48px',
        height: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderLeft: isActive ? '2px solid var(--vscode-activityBar-fg)' : '2px solid transparent',
        transition: 'all 0.2s ease',
        position: 'relative',
    });

    const iconStyle = (isActive, isWarning = false) => ({
        fontSize: '24px',
        color: isWarning ? '#f59e0b' : (isActive ? 'var(--vscode-activityBar-fg)' : 'var(--vscode-activityBar-inactiveFg)'),
        opacity: isActive ? 1 : (isWarning ? 1 : 0.5),
        transition: 'all 0.2s ease',
    });

    const tooltipStyle = {
        position: 'absolute',
        left: '52px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'var(--vscode-editor-bg)',
        color: 'var(--vscode-editor-fg)',
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        border: '1px solid var(--vscode-sideBar-border)',
        zIndex: 1000,
        pointerEvents: 'none',
        opacity: 1,
    };

    const renderItem = (item, isActive = false) => (
        <div
            key={item.id}
            style={itemStyle(isActive, item.isWarning)}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
        >
            <span className="material-icons" style={iconStyle(isActive, item.isWarning)}>{item.icon}</span>
            {hoveredItem === item.id && (
                <div style={tooltipStyle}>
                    {item.label}
                </div>
            )}
        </div>
    );

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
                {topItems.map(item => renderItem(item, activeView === item.id && isSidebarOpen))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {bottomItems.map(item => renderItem(item, false))}
            </div>
        </div>
    );
}
