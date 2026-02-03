import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { CATEGORY_ORDER } from '../data/constants';

// Minimalist SVG Icons (VS Code style)
const ChevronRight = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '4px', opacity: 0.8 }}>
        <path d="M5.7 13.7L5 13l4.6-4.6L5 3.7l.7-.7 5.3 5.4-5.3 5.3z" />
    </svg>
);
const ChevronDown = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '4px', opacity: 0.8 }}>
        <path d="M2.7 5.7L3.4 5 8 9.6 12.6 5l.7.7L8 11 2.7 5.7z" />
    </svg>
);
const FileIcon = () => (
    <svg width="16" height="16" viewBox="0 0 254.5 225" style={{ marginRight: '6px' }}>
        <path fill="#00ACD7" d="M40.2,101.1c-0.4,0-0.5-0.2-0.3-0.5l2.1-2.7c0.2-0.3,0.7-0.5,1.1-0.5l35.7,0c0.4,0,0.5,0.3,0.3,0.6l-1.7,2.6c-0.2,0.3-0.7,0.6-1,0.6L40.2,101.1z" />
        <path fill="#00ACD7" d="M25.1,110.3c-0.4,0-0.5-0.2-0.3-0.5l2.1-2.7c0.2-0.3,0.7-0.5,1.1-0.5l45.6,0c0.4,0,0.6,0.3,0.5,0.6l-0.8,2.4c-0.1,0.4-0.5,0.6-0.9,0.6L25.1,110.3z" />
        <path fill="#00ACD7" d="M49.3,119.5c-0.4,0-0.5-0.3-0.3-0.6l1.4-2.5c0.2-0.3,0.6-0.6,1-0.6l20,0c0.4,0,0.6,0.3,0.6,0.7l-0.2,2.4c0,0.4-0.4,0.7-0.7,0.7L49.3,119.5z" />
        <path fill="#00ACD7" d="M153.1,99.3c-6.3,1.6-10.6,2.8-16.8,4.4c-1.5,0.4-1.6,0.5-2.9-1c-1.5-1.7-2.6-2.8-4.7-3.8c-6.3-3.1-12.4-2.2-18.1,1.5c-6.8,4.4-10.3,10.9-10.2,19c0.1,8,5.6,14.6,13.5,15.7c6.8,0.9,12.5-1.5,17-6.6c0.9-1.1,1.7-2.3,2.7-3.7c-3.6,0-8.1,0-19.3,0c-2.1,0-2.6-1.3-1.9-3c1.3-3.1,3.7-8.3,5.1-10.9c0.3-0.6,1-1.6,2.5-1.6c5.1,0,23.9,0,36.4,0c-0.2,2.7-0.2,5.4-0.6,8.1c-1.1,7.2-3.8,13.8-8.2,19.6c-7.2,9.5-16.6,15.4-28.5,17c-9.8,1.3-18.9-0.6-26.9-6.6c-7.4-5.6-11.6-13-12.7-22.2c-1.3-10.9,1.9-20.7,8.5-29.3c7.1-9.3,16.5-15.2,28-17.3c9.4-1.7,18.4-0.6,26.5,4.9c5.3,3.5,9.1,8.3,11.6,14.1C154.7,98.5,154.3,99,153.1,99.3z" />
        <path fill="#00ACD7" d="M186.2,154.6c-9.1-0.2-17.4-2.8-24.4-8.8c-5.9-5.1-9.6-11.6-10.8-19.3c-1.8-11.3,1.3-21.3,8.1-30.2c7.3-9.6,16.1-14.6,28-16.7c10.2-1.8,19.8-0.8,28.5,5.1c7.9,5.4,12.8,12.7,14.1,22.3c1.7,13.5-2.2,24.5-11.5,33.9c-6.6,6.7-14.7,10.9-24,12.8C191.5,154.2,188.8,154.3,186.2,154.6z M210,114.2c-0.1-1.3-0.1-2.3-0.3-3.3c-1.8-9.9-10.9-15.5-20.4-13.3c-9.3,2.1-15.3,8-17.5,17.4c-1.8,7.8,2,15.7,9.2,18.9c5.5,2.4,11,2.1,16.3-0.6C205.2,129.2,209.5,122.8,210,114.2z" />
    </svg>
);
const FolderIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px', opacity: 0.7 }}>
        <path d="M14 4H8L7 3H2v10h12V4zm-1 8H3V5h10v7z" />
    </svg>
);

export default function Sidebar({ topics = [], currentTopicId, onSelectTopic, isOpen, activeView = 'search' }) {
    const { visitedIds } = useProgress();
    const navigate = useNavigate();

    // Load expanded categories from localStorage or default to empty (all collapsed)
    const [expandedCategories, setExpandedCategories] = useState(() => {
        try {
            const saved = localStorage.getItem('sidebar_expanded_categories');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    const [isProjectExpanded, setIsProjectExpanded] = useState(() => {
        try {
            const saved = localStorage.getItem('sidebar_project_expanded');
            return saved !== null ? JSON.parse(saved) : true;
        } catch {
            return true;
        }
    });

    const [searchQuery, setSearchQuery] = useState('');

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
            }
            const group = groups.find(g => g.name === catName);
            group.topics.push(topic);
        });

        groups.forEach(group => {
            group.topics.sort((a, b) => (a.displayIndex || 0) - (b.displayIndex || 0));
        });

        groups.sort((a, b) => {
            const indexA = CATEGORY_ORDER.indexOf(a.name);
            const indexB = CATEGORY_ORDER.indexOf(b.name);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.name.localeCompare(b.name);
        });

        return groups;
    }, [topics]);

    // Save expanded categories to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('sidebar_expanded_categories', JSON.stringify(expandedCategories));
        } catch { /* ignore */ }
    }, [expandedCategories]);

    // Save project expanded state to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('sidebar_project_expanded', JSON.stringify(isProjectExpanded));
        } catch { /* ignore */ }
    }, [isProjectExpanded]);

    // Auto-expand the category of the currently selected topic
    useEffect(() => {
        if (currentTopicId && topics.length > 0) {
            const selectedTopic = topics.find(t => t.id === currentTopicId);
            if (selectedTopic) {
                const category = selectedTopic.category || 'Uncategorized';
                // Only expand if not already expanded
                if (expandedCategories[category] !== true) {
                    setExpandedCategories(prev => ({
                        ...prev,
                        [category]: true
                    }));
                }
                // Also expand the project section if it's collapsed
                if (!isProjectExpanded) {
                    setIsProjectExpanded(true);
                }
            }
        }
    }, [currentTopicId, topics]);

    // Filter topics based on search query
    const filteredTopics = useMemo(() => {
        if (!searchQuery) return null; // null means show full tree
        return topics.filter(t =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [topics, searchQuery]);

    const toggleCategory = (catName, e) => {
        e.stopPropagation();
        setExpandedCategories(prev => ({
            ...prev,
            [catName]: !prev[catName]
        }));
    };

    // Check if a category is expanded (default to COLLAPSED if not explicitly set)
    const isExpanded = (catName) => {
        return expandedCategories[catName] === true;
    };

    // Style helpers
    const sidebarHeaderStyle = {
        padding: '10px 20px',
        fontSize: '11px',
        fontWeight: 'bold',
        color: 'var(--vscode-sideBar-fg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    const sectionHeaderStyle = {
        padding: '4px 0',
        paddingLeft: '2px',
        cursor: 'pointer',
        fontSize: '11px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center',
        color: 'var(--vscode-sideBarSectionHeader-fg)'
    };

    const treeItemStyle = (isActive) => ({
        padding: '3px 0',
        cursor: 'pointer',
        fontSize: '13px',
        color: isActive ? 'var(--vscode-list-activeSelectionFg)' : 'var(--vscode-sideBar-fg)',
        backgroundColor: isActive ? 'var(--vscode-list-activeSelectionBg)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    });

    // Collapse all categories
    const collapseAll = () => {
        const collapsed = {};
        categorizedTopics.forEach(group => {
            collapsed[group.name] = false;
        });
        setExpandedCategories(collapsed);
        setIsProjectExpanded(false);
    };

    // Expand all categories
    const expandAll = () => {
        const expanded = {};
        categorizedTopics.forEach(group => {
            expanded[group.name] = true;
        });
        setExpandedCategories(expanded);
        setIsProjectExpanded(true);
    };

    if (!isOpen) return null;

    return (
        <div className="vscode-sidebar" style={{
            width: '250px',
            backgroundColor: 'var(--vscode-sideBar-bg)',
            borderRight: '1px solid var(--vscode-sideBar-border)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flexShrink: 0
        }}>
            {/* VIEW HEADER */}
            <div style={sidebarHeaderStyle}>
                <span>GO GURU</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <span
                        className="material-icons"
                        style={{ fontSize: '16px', cursor: 'pointer', opacity: 0.7 }}
                        title="Expand All"
                        onClick={expandAll}
                    >
                        unfold_more
                    </span>
                    <span
                        className="material-icons"
                        style={{ fontSize: '16px', cursor: 'pointer', opacity: 0.7 }}
                        title="Collapse All"
                        onClick={collapseAll}
                    >
                        unfold_less
                    </span>
                </div>
            </div>

            {/* SEARCH BOX */}
            <div style={{ padding: '8px 10px' }}>
                <div style={{ position: 'relative' }}>
                    <span className="material-icons" style={{
                        position: 'absolute',
                        left: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '16px',
                        color: '#888'
                    }}>search</span>
                    <input
                        type="text"
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '6px 6px 6px 30px',
                            backgroundColor: 'var(--vscode-input-bg)',
                            color: 'var(--vscode-input-fg)',
                            border: '1px solid var(--vscode-input-border, #3c3c3c)',
                            outline: 'none',
                            fontSize: '12px'
                        }}
                    />
                </div>
            </div>

            {/* FILE TREE / SEARCH RESULTS */}
            <div style={{ flex: 1, overflowY: 'auto' }}>

                {/* If searching, show filtered results */}
                {filteredTopics !== null ? (
                    <div style={{ padding: '0 10px' }}>
                        <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
                            {filteredTopics.length} results
                        </div>
                        {filteredTopics.map(topic => (
                            <div
                                key={topic.id}
                                style={{ ...treeItemStyle(currentTopicId === topic.id), paddingLeft: '5px' }}
                                onClick={() => onSelectTopic(topic.id)}
                            >
                                <FileIcon />
                                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                    <span>{topic.title}</span>
                                    <span style={{ fontSize: '10px', color: '#888' }}>{topic.category}</span>
                                </div>
                            </div>
                        ))}
                        {filteredTopics.length === 0 && (
                            <div style={{ color: '#888', fontStyle: 'italic', fontSize: '12px' }}>No results found.</div>
                        )}
                    </div>
                ) : (
                    /* Show full file tree */
                    <>
                        <div style={sectionHeaderStyle} onClick={() => setIsProjectExpanded(!isProjectExpanded)}>
                            {isProjectExpanded ? <ChevronDown /> : <ChevronRight />}
                            <span>TOPICS</span>
                        </div>

                        {isProjectExpanded && (
                            <div>
                                <div style={{ ...treeItemStyle(window.location.pathname.includes('/battle')), paddingLeft: '20px' }} onClick={() => navigate('/battle')}>
                                    <span className="material-icons" style={{ fontSize: '16px', marginRight: '6px' }}>sports_kabaddi</span>
                                    <span>battle_mode.go</span>
                                </div>
                                {categorizedTopics.map(group => (
                                    <div key={group.name}>
                                        <div
                                            style={{ ...treeItemStyle(false), paddingLeft: '10px', fontWeight: 'bold' }}
                                            onClick={(e) => toggleCategory(group.name, e)}
                                            title={group.name}
                                        >
                                            {isExpanded(group.name) ? <ChevronDown /> : <ChevronRight />}
                                            <FolderIcon />
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>{group.name}</span>
                                        </div>
                                        {isExpanded(group.name) && (
                                            <div>
                                                {group.topics.map(topic => (
                                                    <div
                                                        key={topic.id}
                                                        style={{ ...treeItemStyle(currentTopicId === topic.id), paddingLeft: '32px' }}
                                                        onClick={() => onSelectTopic(topic.id)}
                                                        title={`${topic.title}.go`}
                                                    >
                                                        <FileIcon />
                                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>
                                                            {topic.title}.go
                                                        </span>
                                                        {visitedIds.includes(topic.id) && (
                                                            <span style={{ marginLeft: '5px', color: '#4ec9b0', fontSize: '12px', flexShrink: 0 }}>✓</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
