import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import ProgressDashboard from './ProgressDashboard';

// SVG Icons for social links
const GitHubIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const CoffeeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 21v-2h18v2H2zm16-4H4V8h2V6H4V4h16v2h-2v2h2c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-2v2zm0-4h2v-5h-2v5zm-2-5H6v7h10V8z" />
    </svg>
);

export default function StatusBar({ totalTopics = 0 }) {
    const { stats, streakData } = useProgress();
    const [showDashboard, setShowDashboard] = useState(false);

    const barStyle = {
        height: '26px',
        backgroundColor: 'var(--vscode-statusBar-bg)',
        color: 'var(--vscode-statusBar-fg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 8px',
        fontSize: '11px',
        userSelect: 'none',
        cursor: 'default',
        flexShrink: 0
    };

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '0 8px',
        height: '100%',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    const progressItemStyle = {
        ...itemStyle,
        background: 'rgba(0, 212, 170, 0.1)',
        borderRadius: '4px',
        margin: '2px 4px',
        padding: '0 10px',
        border: '1px solid rgba(0, 212, 170, 0.2)',
        transition: 'all 0.2s ease'
    };

    return (
        <>
            <div style={barStyle}>
                {/* Left Section - Progress Info */}
                <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                    {/* Level & XP Button */}
                    <button
                        onClick={() => setShowDashboard(true)}
                        style={{
                            ...itemStyle,
                            background: 'none',
                            border: 'none',
                            color: '#00d4aa'
                        }}
                        title="Ver tu progreso"
                    >
                        <span style={{ fontSize: '12px' }}>⭐</span>
                        <span style={{ fontWeight: 600 }}>Nivel {stats.level}</span>
                        <span style={{ color: '#5ee6c2', marginLeft: '4px', fontWeight: 500 }}>
                            {stats.xp} XP
                        </span>
                    </button>

                    {/* Pipe Separator */}
                    <span style={{ color: '#555', margin: '0 4px' }}>|</span>

                    {/* Streak */}
                    {streakData.currentStreak > 0 && (
                        <>
                            <div
                                style={{
                                    ...itemStyle,
                                    cursor: 'default',
                                    color: '#ff8c5a'
                                }}
                                title={`Racha de ${streakData.currentStreak} días`}
                            >
                                <span style={{ fontSize: '12px' }}>🔥</span>
                                <span style={{ fontWeight: 600 }}>{streakData.currentStreak}</span>
                                <span style={{ color: '#ffb899', fontWeight: 500 }}>días</span>
                            </div>
                            <span style={{ color: '#555', margin: '0 4px' }}>|</span>
                        </>
                    )}

                    {/* Topics Progress */}
                    {totalTopics > 0 && (
                        <>
                            <div
                                style={{
                                    ...itemStyle,
                                    cursor: 'default',
                                    color: '#ffd700'
                                }}
                                title="Temas completados"
                            >
                                <span style={{ fontSize: '12px' }}>📚</span>
                                <span style={{ fontWeight: 600 }}>
                                    {stats.completedTopics}<span style={{ color: '#ffe066' }}>/</span>{totalTopics}
                                </span>
                            </div>
                            <span style={{ color: '#555', margin: '0 4px' }}>|</span>
                        </>
                    )}

                    {/* Branch */}
                    <div style={{ ...itemStyle, cursor: 'default' }} title="Git Branch">
                        <span style={{ fontSize: '12px' }}></span>
                        main
                    </div>
                </div>

                {/* Right Section - Social Links */}
                <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                    <a
                        href="https://www.linkedin.com/in/ismael-osuna"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={itemStyle}
                        title="LinkedIn"
                    >
                        <LinkedInIcon />
                        <span>LinkedIn</span>
                    </a>
                    <a
                        href="https://buymeacoffee.com/ismaelosuna"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={itemStyle}
                        title="Buy Me a Coffee"
                    >
                        <CoffeeIcon />
                        <span>Buy Me a Coffee</span>
                    </a>
                    <a
                        href="https://github.com/ismaelosuna7824/go-guru"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={itemStyle}
                        title="GitHub Repository"
                    >
                        <GitHubIcon />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>

            {/* Progress Dashboard Modal */}
            <ProgressDashboard
                isOpen={showDashboard}
                onClose={() => setShowDashboard(false)}
                totalTopics={totalTopics}
            />
        </>
    );
}
