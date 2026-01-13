import { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';

export default function Sidebar({ topics = [], currentTopicId, onSelectTopic, isOpen, setIsOpen }) {
    const { theme, toggleTheme } = useTheme();
    const { visitedIds, resetProgress } = useProgress();
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategories, setExpandedCategories] = useState({});

    // Group topics by category (preserving order from Firebase)
    // The order is determined by the 'order' field in each topic document
    const categorizedTopics = useMemo(() => {
        const categoryMap = new Map();

        // Group topics by category and track the minimum order for each category
        topics.forEach(topic => {
            const catName = topic.category || 'Uncategorized';

            if (!categoryMap.has(catName)) {
                categoryMap.set(catName, {
                    name: catName,
                    topics: [],
                    minOrder: topic.order || Infinity
                });
            }

            const group = categoryMap.get(catName);
            group.topics.push(topic);

            // Track the minimum order to sort categories
            if (topic.order && topic.order < group.minOrder) {
                group.minOrder = topic.order;
            }
        });

        // Convert Map to Array
        const groups = Array.from(categoryMap.values());

        // Sort categories by the minimum order of their topics
        groups.sort((a, b) => {
            const orderA = a.minOrder;
            const orderB = b.minOrder;

            // If both have order, sort by order
            if (orderA !== Infinity && orderB !== Infinity) {
                return orderA - orderB;
            }
            // If only one has order, prioritize it
            if (orderA !== Infinity) return -1;
            if (orderB !== Infinity) return 1;
            // If neither has order, sort alphabetically
            return a.name.localeCompare(b.name);
        });

        // Sort topics within each category by their order field
        groups.forEach(group => {
            group.topics.sort((a, b) => {
                const orderA = a.order || Infinity;
                const orderB = b.order || Infinity;
                return orderA - orderB;
            });
        });

        return groups;
    }, [topics]);

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
                            marginTop: 'var(--spacing-md)',
                            background: 'transparent',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-tertiary)',
                            padding: 'var(--spacing-xs) var(--spacing-sm)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.8rem',
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
