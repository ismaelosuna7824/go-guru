import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';

export default function Sidebar({ topics = [], currentTopicId, onSelectTopic, isOpen, setIsOpen }) {
    const { theme, toggleTheme } = useTheme();
    const { visitedIds, resetProgress } = useProgress();
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategories, setExpandedCategories] = useState({});
    const navigate = useNavigate();

    // Explicit Category Order defined by User
    const CATEGORY_ORDER = [
        "Getting Started",
        "Basic Data Types & Variables",
        "Operators",
        "Control Flow",
        "Data Structures",
        "Functions",
        "Object-Oriented Concepts",
        "Iteration",
        "Error Handling",
        "Concurrency (Goroutines & Channels)",
        "Concurrency Patterns & Synchronization",
        "Time & Scheduling",
        "Sorting & Data Manipulation",
        "String Operations",
        "Data Formats",
        "File System & I/O",
        "Cryptography & Security",
        "Random & Number Operations",
        "URL & Network Utilities",
        "Testing & Quality",
        "Command Line",
        "Logging",
        "HTTP & Web",
        "Network Programming",
        "System Programming",
        "Advanced Concepts",
        "Package Management & Dependencies",
        "Database & ORM",
        "Performance & Debugging",
        "Deployment"
    ];

    // Group topics by category (preserving order)
    const categorizedTopics = useMemo(() => {
        const groups = [];
        const seen = new Set();

        topics.forEach(topic => {
            const catName = topic.category || 'Uncategorized';
            if (!seen.has(catName)) {
                seen.add(catName);
                groups.push({
                    name: catName,
                    topics: []
                });
                // Initialize expanded state for new categories (default open)
                if (expandedCategories[catName] === undefined) {
                    // This side-effect in render is not ideal but standard workaround
                    // Better to just treat undefined as true in isExpanded
                }
            }
            const group = groups.find(g => g.name === catName);
            group.topics.push(topic);
        });

        // Sort groups based on CATEGORY_ORDER
        groups.sort((a, b) => {
            const indexA = CATEGORY_ORDER.indexOf(a.name);
            const indexB = CATEGORY_ORDER.indexOf(b.name);

            // If both are in the list, sort by index
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            // If only A is in list, comes first
            if (indexA !== -1) return -1;
            // If only B is in list, comes first
            if (indexB !== -1) return 1;
            // If neither, sort alphabetically
            return a.name.localeCompare(b.name);
        });

        return groups;
    }, []);

    // Toggle category expansion
    const toggleCategory = (catName) => {
        setExpandedCategories(prev => ({
            ...prev,
            [catName]: prev[catName] === undefined ? false : !prev[catName]
        }));
    };

    const isExpanded = (catName) => {
        return expandedCategories[catName] !== false; // Default Open
    };

    const filteredTopics = topics.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(false)}
            />

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <img src="/logo.png" alt="Go Guru Logo" className="brand-logo" />
                        <h1 className="brand-title" style={{ fontSize: '1.5rem', margin: 0 }}>
                            Go Guru
                        </h1>
                    </div>
                    <button
                        className="btn-icon"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>

                <div className="sidebar-search">
                    <input
                        type="text"
                        placeholder="Search topics..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Battle Direct Link */}
                <div style={{ padding: '0 var(--spacing-sm) var(--spacing-sm)' }}>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            navigate('/battle');
                        }}
                        className="nav-item battle-mode-btn"
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                            border: 'none',
                            color: '#ffffff',
                            fontWeight: 800,
                            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                            marginTop: '8px',
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontSize: '0.9rem',
                            position: 'relative',
                            overflow: 'hidden',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {/* Clashing Swords Container */}
                        <div className="battle-icon-container">
                            <span className="sword sword-left">🗡️</span>
                            <span className="sword sword-right">🗡️</span>
                        </div>

                        <span style={{ position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.3)', marginLeft: '8px' }}>
                            Battle Mode
                        </span>

                        {/* Sparkles */}
                        <span className="star star-1">✨</span>
                        <span className="star star-2">✨</span>
                        <span className="star star-3">✦</span>
                    </button>

                    <style>{`
                        .battle-mode-btn:hover {
                            transform: translateY(-2px) scale(1.02);
                            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.6) !important;
                            background: linear-gradient(135deg, #9333ea 0%, #2563eb 100%) !important;
                        }

                        .battle-icon-container {
                            position: relative;
                            width: 24px;
                            height: 24px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .sword {
                            position: absolute;
                            font-size: 1.2rem;
                            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                            filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
                        }

                        .sword-left {
                            transform: translate(-2px, 0) rotate(0deg);
                            left: 0;
                            z-index: 2;
                        }

                        .sword-right {
                            transform: translate(2px, 0) scaleX(-1) rotate(0deg);
                            right: 0;
                            z-index: 1;
                        }

                        /* Hover Animation: Clash */
                        .battle-mode-btn:hover .sword-left {
                            animation: clash-left 0.6s ease-in-out infinite;
                        }
                        .battle-mode-btn:hover .sword-right {
                            animation: clash-right 0.6s ease-in-out infinite;
                        }

                        @keyframes clash-left {
                            0% { transform: translate(-2px, 0) rotate(0deg); }
                            25% { transform: translate(-8px, -5px) rotate(-45deg); } /* Pull back */
                            50% { transform: translate(4px, 2px) rotate(20deg); } /* Strike */
                            75% { transform: translate(0, 0) rotate(0deg); }
                            100% { transform: translate(-2px, 0) rotate(0deg); }
                        }

                        @keyframes clash-right {
                            0% { transform: translate(2px, 0) scaleX(-1) rotate(0deg); }
                            25% { transform: translate(8px, -5px) scaleX(-1) rotate(-45deg); } /* Pull back */
                            50% { transform: translate(-4px, 2px) scaleX(-1) rotate(20deg); } /* Strike */
                            75% { transform: translate(0, 0) scaleX(-1) rotate(0deg); }
                            100% { transform: translate(2px, 0) scaleX(-1) rotate(0deg); }
                        }

                        /* Sparkles */
                        .star {
                            position: absolute;
                            font-size: 10px;
                            color: #ffff80; /* Light yellow tint */
                            opacity: 0;
                            pointer-events: none;
                        }
                        
                        .battle-mode-btn:hover .star {
                             animation: twinkle 1s infinite;
                        }

                        .star-1 { top: 5px; right: 20px; animation-delay: 0s; }
                        .star-2 { bottom: 8px; left: 15px; animation-delay: 0.3s; font-size: 8px; }
                        .star-3 { top: 10px; left: 45%; animation-delay: 0.6s; font-size: 12px; color: white; }
                        
                        @keyframes twinkle {
                            0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
                            50% { opacity: 1; transform: scale(1.4) rotate(180deg); text-shadow: 0 0 5px white; }
                            100% { opacity: 0; transform: scale(0.5) rotate(360deg); }
                        }
                    `}</style>
                </div>

                <nav className="sidebar-nav">
                    {/* Search Mode: Flat List */}
                    {searchTerm && (
                        <>
                            {filteredTopics.length === 0 && (
                                <div style={{ padding: 'var(--spacing-md)', color: 'var(--text-tertiary)', fontSize: '0.9rem', textAlign: 'center' }}>
                                    No matching topics
                                </div>
                            )}
                            {filteredTopics.map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => onSelectTopic(topic.id)}
                                    className={`nav-item ${currentTopicId === topic.id ? 'active' : ''}`}
                                >
                                    <span className="nav-index">
                                        {(topics.findIndex(t => t.id === topic.id) + 1).toString().padStart(2, '0')}
                                    </span>
                                    {topic.title}
                                    {visitedIds.includes(topic.id) && (
                                        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'var(--primary)' }} title="Completed">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            ))}
                        </>
                    )}

                    {/* Category Mode: Grouped List */}
                    {!searchTerm && (
                        categorizedTopics.map(group => (
                            <div key={group.name} className="nav-group">
                                <button
                                    className="nav-group-header"
                                    onClick={() => toggleCategory(group.name)}
                                >
                                    <span className="group-title">{group.name}</span>
                                    <span className="group-toggle">
                                        {isExpanded(group.name) ? '−' : '+'}
                                    </span>
                                </button>

                                {isExpanded(group.name) && (
                                    <div className="nav-group-items">
                                        {group.topics.map(topic => (
                                            <button
                                                key={topic.id}
                                                onClick={() => onSelectTopic(topic.id)}
                                                className={`nav-item ${currentTopicId === topic.id ? 'active' : ''}`}
                                            >
                                                <span className="nav-index">
                                                    {(topics.findIndex(t => t.id === topic.id) + 1).toString().padStart(2, '0')}
                                                </span>
                                                {topic.title}
                                                {visitedIds.includes(topic.id) && (
                                                    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'var(--primary)' }} title="Completed">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </nav>

                <div className="sidebar-footer">
                    <a
                        href="https://www.linkedin.com/in/ismael-osuna"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <span>🔗</span> LinkedIn
                    </a>
                    <a
                        href="https://buymeacoffee.com/ismaelosuna"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <span>☕</span> Buy Me a Coffee
                    </a>
                    <a
                        href="https://github.com/ismaelosuna7824/go-guru"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <span>🐙</span> GitHub Repo
                    </a>
                    <button
                        onClick={() => {
                            if (window.confirm('¿Estás seguro de borrar todo tu progreso?')) {
                                resetProgress();
                                onSelectTopic(topics[0].id); // Reset view to first topic
                            }
                        }}
                        style={{
                            marginTop: 'var(--spacing-sm)',
                            background: 'transparent',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-tertiary)',
                            padding: '2px var(--spacing-sm)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            width: '100%',
                            cursor: 'pointer'
                        }}
                    >
                        Reset Progress
                    </button>
                </div>
            </aside>
        </>
    );
}
