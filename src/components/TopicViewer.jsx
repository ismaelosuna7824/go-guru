import React, { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import SEO from './SEO';
import { logTopicView } from '../firebase';
import { useProgress } from '../context/ProgressContext';
import { useTheme } from '../context/ThemeContext';
import CodePlayground from './CodePlayground';
import CodeViewer from './CodeViewer';

const parseFormattedText = (text) => {
    if (!text) return null;
    return text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`[^`]+?`)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} style={{ color: 'var(--vscode-editor-fg)', fontWeight: 'bold' }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code key={i} style={{ color: '#ce9178', fontFamily: 'var(--font-mono)' }}>
                    {part.slice(1, -1)}
                </code>
            );
        }
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
            return (
                <a
                    key={i}
                    href={linkMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {linkMatch[1]}
                </a>
            );
        }
        return part;
    });
};

const renderMarkdownLines = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    const result = [];
    let listBuffer = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        if (trimmed.startsWith('* ')) {
            listBuffer.push(
                <li key={`li-${index}`} style={{ marginBottom: '4px' }}>
                    {parseFormattedText(trimmed.substring(2))}
                </li>
            );
        } else {
            if (listBuffer.length > 0) {
                result.push(
                    <ul key={`ul-${index}`} style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                        {listBuffer}
                    </ul>
                );
                listBuffer = [];
            }
            if (trimmed) {
                result.push(
                    <div key={`p-${index}`} style={{ marginBottom: '10px' }}>
                        {parseFormattedText(line)}
                    </div>
                );
            } else {
                result.push(<div key={`br-${index}`} style={{ height: '10px' }} />);
            }
        }
    });

    if (listBuffer.length > 0) {
        result.push(
            <ul key="ul-last" style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                {listBuffer}
            </ul>
        );
    }

    return result;
};

const renderGuideContent = (fullText) => {
    if (!fullText) return null;
    const parts = fullText.split(/(```[\w]*\n[\s\S]*?```)/g);

    return parts.map((part, index) => {
        if (part.startsWith('```')) {
            const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
            if (match) {
                const language = match[1] || '';
                const code = match[2];
                return (
                    <div key={`code-${index}`} style={{ margin: '16px 0', border: '1px solid #333' }}>
                        <CodeViewer code={code} language={language || 'go'} />
                    </div>
                );
            }
            return null;
        } else {
            return <div key={`text-${index}`} className="markdown-content">{renderMarkdownLines(part)}</div>;
        }
    });
};

export default function TopicViewer({ topic, onOpenSidebar }) {
    const [showSolution, setShowSolution] = useState(false);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [draggedTab, setDraggedTab] = useState(null);
    const [dragOverTab, setDragOverTab] = useState(null);
    const { markAsCompleted, visitedIds } = useProgress();
    const { fontSizeValue } = useTheme();
    const navigate = useNavigate();

    // Get tabs from context
    const context = useOutletContext() || {};
    const { topics = [], openTabs = [], handleCloseTab, handleCloseAllTabs, handleReorderTabs } = context;

    // Drag and drop handlers
    const handleDragStart = (e, tabId) => {
        setDraggedTab(tabId);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', tabId);
        // Add a slight delay for better visual feedback
        setTimeout(() => {
            e.target.style.opacity = '0.5';
        }, 0);
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggedTab(null);
        setDragOverTab(null);
    };

    const handleDragOver = (e, tabId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (tabId !== draggedTab) {
            setDragOverTab(tabId);
        }
    };

    const handleDragLeave = () => {
        setDragOverTab(null);
    };

    const handleDrop = (e, targetTabId) => {
        e.preventDefault();
        if (draggedTab && draggedTab !== targetTabId && handleReorderTabs) {
            const newTabs = [...openTabs];
            const draggedIndex = newTabs.indexOf(draggedTab);
            const targetIndex = newTabs.indexOf(targetTabId);

            // Remove dragged tab and insert at target position
            newTabs.splice(draggedIndex, 1);
            newTabs.splice(targetIndex, 0, draggedTab);

            handleReorderTabs(newTabs);
        }
        setDraggedTab(null);
        setDragOverTab(null);
    };

    // Handle right-click on tabs area
    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    };

    // Close context menu
    const closeContextMenu = () => {
        setContextMenu({ visible: false, x: 0, y: 0 });
    };

    // Handle close all from context menu
    const handleCloseAllFromMenu = () => {
        if (handleCloseAllTabs) {
            handleCloseAllTabs();
        }
        closeContextMenu();
    };

    useEffect(() => {
        const contentArea = document.getElementById('editor-content-area');
        if (contentArea) contentArea.scrollTo(0, 0);

        if (topic) {
            logTopicView(topic);
            setShowSolution(false);
        }
    }, [topic?.id]);

    useEffect(() => {
        if (!topic || visitedIds.includes(topic.id)) return;

        const handleScroll = (e) => {
            const target = e.target;
            if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
                markAsCompleted(topic.id);
            }
        };

        const contentArea = document.getElementById('editor-content-area');
        if (contentArea) {
            contentArea.addEventListener('scroll', handleScroll);
            if (contentArea.scrollHeight <= contentArea.clientHeight) {
                markAsCompleted(topic.id);
            }
        }

        return () => {
            if (contentArea) contentArea.removeEventListener('scroll', handleScroll);
        };
    }, [topic?.id, visitedIds, markAsCompleted]);

    const guideContent = React.useMemo(() => {
        return topic?.guide ? renderGuideContent(topic.guide) : null;
    }, [topic?.guide]);

    const explanationContent = React.useMemo(() => {
        if (!topic?.explanation) return null;
        return topic.explanation.map((item, idx) => ({
            ...item,
            renderedText: renderMarkdownLines(item.text)
        }));
    }, [topic?.explanation]);

    if (!topic) return <div style={{ padding: '20px', color: '#888' }}>Select a file from the explorer to view.</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: 'var(--vscode-editor-bg)' }}>
            <SEO
                title={topic.title}
                description={topic.description}
                topic={topic}
                url={typeof window !== 'undefined' ? window.location.href : undefined}
                type="article"
            />

            {/* Tabs Header */}
            <div
                className="tabs-container"
                onContextMenu={handleContextMenu}
                onClick={closeContextMenu}
                style={{
                    minHeight: '35px',
                    maxHeight: '35px',
                    backgroundColor: 'var(--vscode-editorGroupHeader-tabsBg)',
                    alignItems: 'flex-end',
                    borderBottom: '1px solid var(--vscode-tab-border)'
                }}
            >
                {openTabs.map(tabId => {
                    const tabTopic = topics.find(t => t.id === tabId);
                    if (!tabTopic) return null;
                    const isActive = topic.id === tabId;
                    const isDragOver = dragOverTab === tabId && draggedTab !== tabId;

                    return (
                        <div
                            key={tabId}
                            draggable
                            onDragStart={(e) => handleDragStart(e, tabId)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => handleDragOver(e, tabId)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, tabId)}
                            onClick={() => navigate(`/${tabId}`)}
                            style={{
                                padding: '8px 12px',
                                backgroundColor: isActive ? 'var(--vscode-tab-activeBg)' : 'var(--vscode-tab-inactiveBg)',
                                color: isActive ? 'var(--vscode-tab-activeFg)' : 'var(--vscode-tab-inactiveFg)',
                                fontSize: '13px',
                                borderRight: '1px solid var(--vscode-tab-border)',
                                borderTop: isActive ? '1px solid var(--vscode-focusBorder)' : '1px solid transparent',
                                borderLeft: isDragOver ? '2px solid var(--vscode-focusBorder)' : '2px solid transparent',
                                cursor: 'grab',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                flexShrink: 0,
                                height: '35px',
                                transition: 'border-left 0.15s ease'
                            }}
                        >
                            <span className="material-icons" style={{ fontSize: '14px', pointerEvents: 'none' }}>description</span>
                            <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', pointerEvents: 'none' }}>{tabTopic.title}</span>
                            <span
                                onClick={(e) => handleCloseTab && handleCloseTab(tabId, e)}
                                style={{
                                    marginLeft: '4px',
                                    fontSize: '16px',
                                    opacity: 0.6,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '3px'
                                }}
                                onMouseEnter={(e) => e.target.style.opacity = '1'}
                                onMouseLeave={(e) => e.target.style.opacity = '0.6'}
                            >
                                ×
                            </span>
                        </div>
                    );
                })}

            </div>


            {/* Breadcrumbs */}
            <div style={{
                height: '22px',
                backgroundColor: 'var(--vscode-editor-bg)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                fontSize: '11px',
                color: 'var(--text-secondary, #888)'
            }}>
                src <span style={{ margin: '0 4px' }}>&rsaquo;</span>
                {topic.category || 'general'} <span style={{ margin: '0 4px' }}>&rsaquo;</span>
                {topic.title}.go
            </div>

            {/* Main Content Area - Scrollable */}
            <div
                id="editor-content-area"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '40px 24px',
                    color: 'var(--vscode-editor-fg)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: `${fontSizeValue}px`,
                    lineHeight: '1.8',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'var(--vscode-editor-bg)'
                }}
            >
                <div style={{ maxWidth: '900px', width: '100%' }}>
                    {/* Title */}
                    <h1 style={{
                        fontSize: '2.2em',
                        marginBottom: '12px',
                        fontWeight: '600',
                        letterSpacing: '-0.02em',
                        color: 'var(--vscode-editor-fg)'
                    }}>
                        {topic.title}
                    </h1>

                    {/* Description */}
                    <p style={{
                        color: 'var(--text-secondary, #888)',
                        marginBottom: '32px',
                        fontSize: '1.15em',
                        lineHeight: '1.7'
                    }}>
                        {topic.description}
                    </p>

                    {/* Guide Content (Conceptual) */}
                    {topic.guide && (
                        <div style={{
                            marginBottom: '48px',
                            padding: '24px',
                            backgroundColor: 'var(--vscode-sideBar-bg)',
                            borderRadius: '8px',
                            border: '1px solid var(--vscode-sideBar-border)'
                        }}>
                            <h2 style={{
                                color: '#569cd6',
                                fontSize: '1.2em',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span className="material-icons" style={{ fontSize: '20px' }}>lightbulb</span>
                                Conceptual Guide
                            </h2>
                            <div style={{ lineHeight: '1.8' }}>
                                {guideContent}
                            </div>
                        </div>
                    )}

                    {/* Explanation Blocks */}
                    <div style={{ marginBottom: '40px' }}>
                        {explanationContent && explanationContent.map((item, idx) => (
                            <div key={idx} style={{
                                marginBottom: '32px',
                                paddingBottom: '24px',
                                borderBottom: idx < explanationContent.length - 1 ? '1px solid var(--vscode-sideBar-border)' : 'none'
                            }}>
                                <div className="markdown-content" style={{
                                    marginBottom: '16px',
                                    lineHeight: '1.8'
                                }}>
                                    {item.renderedText}
                                </div>
                                {item.lineCode && (
                                    <div style={{
                                        borderRadius: '6px',
                                        overflow: 'hidden',
                                        border: '1px solid var(--vscode-sideBar-border)'
                                    }}>
                                        <CodeViewer code={item.lineCode} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Full Code */}
                    {(!topic.explanation || topic.explanation.length === 0) && (
                        <div style={{
                            borderRadius: '6px',
                            overflow: 'hidden',
                            marginBottom: '40px',
                            border: '1px solid var(--vscode-sideBar-border)'
                        }}>
                            <CodeViewer code={topic.code} />
                        </div>
                    )}

                    {/* Use Case */}
                    {topic.useCase && (
                        <div style={{
                            marginBottom: '48px',
                            padding: '24px',
                            backgroundColor: 'rgba(78, 201, 176, 0.08)',
                            borderRadius: '8px',
                            border: '1px solid rgba(78, 201, 176, 0.3)',
                            textAlign: 'left'
                        }}>
                            <h2 style={{
                                color: '#4ec9b0',
                                fontSize: '1.2em',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                textAlign: 'left',
                                width: '100%'
                            }}>
                                Real World: {topic.useCase.title}
                            </h2>
                            <p style={{
                                marginBottom: '20px',
                                color: 'var(--vscode-editor-fg)',
                                lineHeight: '1.7'
                            }}>
                                {topic.useCase.description}
                            </p>
                            <div style={{
                                borderRadius: '6px',
                                overflow: 'hidden',
                                border: '1px solid var(--vscode-sideBar-border)'
                            }}>
                                <CodeViewer code={topic.useCase.code} />
                            </div>
                        </div>
                    )}

                    {/* Testing Example Section */}
                    {topic.testExample && (
                        <div style={{
                            marginBottom: '48px',
                            padding: '24px',
                            backgroundColor: 'rgba(251, 191, 36, 0.08)',
                            borderRadius: '8px',
                            border: '1px solid rgba(251, 191, 36, 0.3)'
                        }}>
                            <h2 style={{
                                color: '#fbbf24',
                                fontSize: '1.2em',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span className="material-icons" style={{ fontSize: '20px' }}>science</span>
                                Testing
                            </h2>
                            {topic.testExample.description && (
                                <p style={{
                                    marginBottom: '20px',
                                    lineHeight: '1.7',
                                    color: 'var(--text-secondary, #888)'
                                }}>
                                    {topic.testExample.description}
                                </p>
                            )}

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}>
                                {topic.testExample.functionCode && (
                                    <div style={{ minWidth: 0 }}>
                                        <h4 style={{ fontSize: '0.85em', marginBottom: '8px', color: 'var(--text-secondary, #888)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Función</h4>
                                        <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--vscode-sideBar-border)' }}>
                                            <CodeViewer code={topic.testExample.functionCode} />
                                        </div>
                                    </div>
                                )}

                                {topic.testExample.testCode && (
                                    <div style={{ minWidth: 0 }}>
                                        <h4 style={{ fontSize: '0.85em', marginBottom: '8px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Test</h4>
                                        <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                                            <CodeViewer code={topic.testExample.testCode} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Exercise */}
                    {topic.exercise && (
                        <div style={{
                            marginBottom: '50px',
                            padding: '24px',
                            backgroundColor: 'rgba(197, 134, 192, 0.08)',
                            borderRadius: '8px',
                            border: '1px solid rgba(197, 134, 192, 0.3)'
                        }}>
                            <h2 style={{
                                color: '#c586c0',
                                fontSize: '1.2em',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span className="material-icons" style={{ fontSize: '20px' }}>code</span>
                                Practice Challenge
                            </h2>
                            <p style={{
                                marginBottom: '20px',
                                lineHeight: '1.7',
                                color: 'var(--vscode-editor-fg)'
                            }}>
                                {topic.exercise.question}
                            </p>

                            <div style={{
                                borderRadius: '6px',
                                overflow: 'hidden',
                                marginBottom: '20px',
                                border: '1px solid var(--vscode-sideBar-border)'
                            }}>
                                <CodePlayground
                                    key={topic.id}
                                    initialCode={topic.exercise.initialCode || '// Write your code here...'}
                                    expectedOutput={topic.exercise.expectedOutput}
                                />
                            </div>

                            <button
                                onClick={() => setShowSolution(!showSolution)}
                                style={{
                                    backgroundColor: 'var(--vscode-button-bg)',
                                    color: 'var(--vscode-button-fg)',
                                    border: 'none',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <span className="material-icons" style={{ fontSize: '16px' }}>
                                    {showSolution ? 'visibility_off' : 'visibility'}
                                </span>
                                {showSolution ? 'Hide Solution' : 'Show Solution'}
                            </button>

                            {showSolution && (
                                <div style={{
                                    marginTop: '15px',
                                    borderRadius: '6px',
                                    overflow: 'hidden',
                                    border: '1px solid var(--vscode-sideBar-border)'
                                }}>
                                    <CodeViewer code={topic.exercise.solution} />
                                </div>
                            )}
                        </div>
                    )}


                    {/* Spacer at bottom */}
                    <div style={{ height: '100px' }}></div>
                </div>
            </div>

            {/* Context Menu for Tabs */}
            {contextMenu.visible && (
                <>
                    <div
                        onClick={closeContextMenu}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 999
                        }}
                    />
                    <div style={{
                        position: 'fixed',
                        top: contextMenu.y,
                        left: contextMenu.x,
                        backgroundColor: 'var(--vscode-sideBar-bg)',
                        border: '1px solid var(--vscode-sideBar-border)',
                        borderRadius: '4px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        zIndex: 1000,
                        minWidth: '160px',
                        padding: '4px 0'
                    }}>
                        <div
                            onClick={handleCloseAllFromMenu}
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                color: 'var(--vscode-editor-fg)',
                                fontSize: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-list-hoverBg)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <span className="material-icons" style={{ fontSize: '16px' }}>close</span>
                            Cerrar Todas las Tabs
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

