import React, { useEffect, useState } from 'react';
import SEO from './SEO';
import { logTopicView } from '../firebase';
import { useProgress } from '../context/ProgressContext';
import CodePlayground from './CodePlayground';
import CodeViewer from './CodeViewer';

const parseFormattedText = (text) => {
    if (!text) return null;
    // Regex matches: **bold**, [link](url), or `code`
    return text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`[^`]+?`)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code key={i} className="inline-code">
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
                    style={{ color: '#64b5f6', textDecoration: 'underline', cursor: 'pointer' }}
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
        // Skip empty lines if they are just whitespace, unless they are intentional breaks
        // But the original logic handled empty lines by adding a spacer.

        if (trimmed.startsWith('* ')) {
            listBuffer.push(
                <li key={`li-${index}`} style={{ marginBottom: 'var(--spacing-xs)' }}>
                    {parseFormattedText(trimmed.substring(2))}
                </li>
            );
        } else {
            if (listBuffer.length > 0) {
                result.push(
                    <ul key={`ul-${index}`} style={{ paddingLeft: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                        {listBuffer}
                    </ul>
                );
                listBuffer = [];
            }
            if (trimmed) {
                result.push(
                    <div key={`p-${index}`} style={{ marginBottom: 'var(--spacing-sm)' }}>
                        {parseFormattedText(line)}
                    </div>
                );
            } else {
                // Keep the whitespace/spacer logic as it was useful for spacing
                result.push(<div key={`br-${index}`} style={{ height: 'var(--spacing-sm)' }} />);
            }
        }
    });

    if (listBuffer.length > 0) {
        result.push(
            <ul key="ul-last" style={{ paddingLeft: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                {listBuffer}
            </ul>
        );
    }

    return result;
};

const renderGuideContent = (fullText) => {
    if (!fullText) return null;

    // Split by code blocks: ```lang\ncode```
    // The regex captures the block so it is included in the split array
    const parts = fullText.split(/(```[\w]*\n[\s\S]*?```)/g);

    return parts.map((part, index) => {
        if (part.startsWith('```')) {
            const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
            if (match) {
                const language = match[1] || '';
                const code = match[2]; // match[2] is the code block content
                return (
                    <div key={`code-${index}`} className="code-container" style={{ margin: 'var(--spacing-md) 0' }}>
                        <CodeViewer code={code} language={language || 'go'} />
                    </div>
                );
            }
            return null;
        } else {
            // Render standard text sections
            return <React.Fragment key={`text-${index}`}>{renderMarkdownLines(part)}</React.Fragment>;
        }
    });
};

export default function TopicViewer({ topic, onOpenSidebar }) {
    const [showSolution, setShowSolution] = useState(false);
    const { markAsCompleted, visitedIds } = useProgress();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (topic) {
            logTopicView(topic);
            setShowSolution(false); // Reset solution visibility on topic change

            // If the content is short and doesn't scroll, mark as completed immediately
            // But we need to wait for render. Let's start with scroll listener.
        }
    }, [topic?.id]);

    useEffect(() => {
        if (!topic || visitedIds.includes(topic.id)) return;

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Check if we are near the bottom (within 100px)
            if (scrollTop + windowHeight >= docHeight - 100) {
                markAsCompleted(topic.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once to check if already visible/short
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
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

    if (!topic) return <div className="card">Select a topic to begin.</div>;

    return (
        <div className="topic-container">
            {/* Mobile Sidebar Trigger */}
            <button className="mobile-menu-btn" onClick={onOpenSidebar}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            <header className="topic-header">
                <SEO
                    title={topic.title}
                    description={topic.description}
                    topic={topic}
                    url={typeof window !== 'undefined' ? window.location.href : undefined}
                    type="article"
                />
                <h1 className="topic-title">{topic.title}</h1>
                <p className="topic-desc">{topic.description}</p>
            </header>

            {/* Deep Dive / Theory Guide */}
            {topic.guide && (
                <div className="card">
                    <h2 className="variant-title" style={{ color: 'var(--primary)' }}>
                        📘 Guía Conceptual
                    </h2>
                    <div style={{ color: 'var(--text-secondary)' }}>
                        {guideContent}
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="explanation-grid">
                {explanationContent && explanationContent.map((item, idx) => (
                    <div key={idx} className="explanation-item">
                        <div style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                            {item.renderedText}
                        </div>
                        {item.lineCode && (
                            <div className="code-container" style={{ margin: 0 }}>
                                <CodeViewer code={item.lineCode} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Full Code Example */}
            {(!topic.explanation || topic.explanation.length === 0) && (
                <div className="card">
                    <div className="code-container" style={{ marginTop: 0 }}>
                        <CodeViewer code={topic.code} />
                    </div>
                </div>
            )}

            {/* Real World Use Case Section */}
            {topic.useCase && (
                <div className="card card-variant-green">
                    <h3 className="variant-title text-green">
                        🏢 Caso de Uso Real
                    </h3>
                    <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>{topic.useCase.title}</h4>
                    <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
                        {topic.useCase.description}
                    </p>

                    <div className="code-container">
                        <CodeViewer code={topic.useCase.code} />
                    </div>
                </div>
            )}

            {/* Testing Example Section */}
            {topic.testExample && (
                <div className="card card-variant-amber">
                    <h3 className="variant-title text-amber">
                        🧪 Testing
                    </h3>
                    <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
                        {topic.testExample.description}
                    </p>

                    <div className="testing-grid">
                        <div style={{ minWidth: 0 }}>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: 'var(--spacing-xs)', color: 'var(--text-tertiary)' }}>FUNCIÓN</h4>
                            <div className="code-container" style={{ marginTop: 0 }}>
                                <CodeViewer code={topic.testExample.functionCode} />
                            </div>
                        </div>

                        <div style={{ minWidth: 0 }}>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: 'var(--spacing-xs)', color: 'var(--text-tertiary)' }}>TEST</h4>
                            <div className="code-container" style={{ marginTop: 0, borderColor: 'var(--accent-amber-border)' }}>
                                <CodeViewer code={topic.testExample.testCode} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Exercise Section */}
            {topic.exercise && (
                <div className="card card-variant-blue">
                    <h3 className="variant-title text-blue">
                        🚀 Challenge
                    </h3>
                    <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                        {topic.exercise.question}
                    </p>

                    <CodePlayground
                        key={topic.id}
                        initialCode={topic.exercise.initialCode || '// Write your code here...'}
                        expectedOutput={topic.exercise.expectedOutput}
                    />

                    {/* Solution Section */}
                    <div style={{ marginTop: 'var(--spacing-lg)' }}>
                        <button
                            className="btn-primary"
                            onClick={() => setShowSolution(!showSolution)}
                            style={{
                                background: showSolution ? 'var(--bg-code)' : 'var(--text-primary)',
                                color: showSolution ? 'var(--text-primary)' : 'var(--bg-app)',
                                border: showSolution ? '1px solid var(--border-subtle)' : 'none'
                            }}
                        >
                            {showSolution ? 'Ocultar Solución' : 'Ver Solución'}
                        </button>

                        {showSolution && (
                            <div className="code-container" style={{ marginTop: 'var(--spacing-md)', borderColor: 'var(--accent-blue-border)' }}>
                                <div className="code-badge text-blue">Solución</div>
                                <CodeViewer code={topic.exercise.solution} />
                            </div>
                        )}
                    </div>


                </div>
            )}
        </div>
    );
}
