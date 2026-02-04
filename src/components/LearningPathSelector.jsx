import React, { useState } from 'react';
import { useLearningPaths } from '../hooks/useLearningPaths';
import { useProgress } from '../context/ProgressContext';

/**
 * Learning Path Selector - Shows available learning paths with progress
 * Uses CSS variables for theme compatibility
 */
export default function LearningPathSelector({ onSelectPath, onSelectTopic, onOpenPathTopics, currentPathId }) {
    const { paths, loading } = useLearningPaths();
    const { visitedIds } = useProgress();
    const [expandedPath, setExpandedPath] = useState(currentPathId || null);

    if (loading) {
        return (
            <div className="learning-paths-container">
                <div className="loading-spinner" />
            </div>
        );
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return '#00d4aa';
            case 'intermediate': return '#ffa500';
            case 'advanced': return '#ff6b6b';
            default: return 'var(--text-secondary)';
        }
    };

    const getDifficultyLabel = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'Principiante';
            case 'intermediate': return 'Intermedio';
            case 'advanced': return 'Avanzado';
            default: return difficulty;
        }
    };

    const getPathProgress = (path) => {
        const completed = path.topics.filter(t => visitedIds.includes(t)).length;
        return {
            completed,
            total: path.topics.length,
            percentage: path.topics.length > 0 ? Math.round((completed / path.topics.length) * 100) : 0
        };
    };

    return (
        <div className="learning-paths-container">
            <div className="learning-paths-header">
                <span className="header-icon">🛤️</span>
                <h2>Rutas de Aprendizaje</h2>
            </div>
            <p className="learning-paths-subtitle">
                Sigue un camino estructurado para dominar Go
            </p>

            <div className="paths-grid">
                {paths.map(path => {
                    const progress = getPathProgress(path);
                    const isExpanded = expandedPath === path.id;
                    const isActive = currentPathId === path.id;

                    return (
                        <div
                            key={path.id}
                            className={`path-card ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}
                        >
                            {/* Path Header */}
                            <div
                                className="path-header"
                                onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                            >
                                <div className="path-icon">
                                    <span className="material-icons">{path.icon}</span>
                                </div>
                                <div className="path-info">
                                    <div className="path-title">{path.title}</div>
                                    <div className="path-meta">
                                        <span
                                            className="difficulty-badge"
                                            style={{
                                                color: getDifficultyColor(path.difficulty),
                                                borderColor: getDifficultyColor(path.difficulty)
                                            }}
                                        >
                                            {getDifficultyLabel(path.difficulty)}
                                        </span>
                                        {/* <span className="duration">
                                            ⏱️ {path.estimatedHours}h
                                        </span> */}
                                    </div>
                                </div>
                                <div className="expand-icon">
                                    {isExpanded ? '▼' : '▶'}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="progress-container">
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${progress.percentage}%`,
                                            background: progress.percentage === 100
                                                ? 'linear-gradient(90deg, #00d4aa, #00b894)'
                                                : 'var(--vscode-focusBorder)'
                                        }}
                                    />
                                </div>
                                <span className="progress-text">
                                    {progress.completed}/{progress.total}
                                </span>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="expanded-content">
                                    <p className="path-description">{path.description}</p>

                                    <div className="topics-list">
                                        {path.topics.map((topicId, idx) => {
                                            const isCompleted = visitedIds.includes(topicId);
                                            return (
                                                <div
                                                    key={topicId}
                                                    className={`topic-item ${isCompleted ? 'completed' : ''}`}
                                                    onClick={() => onSelectTopic && onSelectTopic(topicId)}
                                                >
                                                    <span className="topic-number">{idx + 1}</span>
                                                    <span className="topic-name">{topicId}</span>
                                                    {isCompleted && (
                                                        <span className="checkmark">✓</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button
                                        className="start-button"
                                        onClick={() => {
                                            if (onSelectPath) onSelectPath(path.id);

                                            // Open all topics from the path as tabs
                                            if (onOpenPathTopics) {
                                                onOpenPathTopics(path.topics);
                                            } else {
                                                // Fallback: just navigate to first uncompleted topic
                                                const nextTopic = path.topics.find(t => !visitedIds.includes(t)) || path.topics[0];
                                                if (nextTopic && onSelectTopic) {
                                                    onSelectTopic(nextTopic);
                                                }
                                            }
                                        }}
                                    >
                                        {progress.percentage === 0
                                            ? 'Comenzar Ruta'
                                            : progress.percentage === 100
                                                ? 'Ruta Completada'
                                                : 'Continuar'}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <style>{`
                .learning-paths-container {
                    padding: 24px;
                    max-width: 800px;
                    margin: 0 auto;
                    color: var(--vscode-editor-fg);
                }

                .loading-spinner {
                    width: 32px;
                    height: 32px;
                    border: 3px solid var(--vscode-sideBar-border);
                    border-top: 3px solid var(--vscode-focusBorder);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 40px auto;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .learning-paths-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                }

                .header-icon {
                    font-size: 24px;
                }

                .learning-paths-header h2 {
                    font-size: 24px;
                    font-weight: 600;
                    color: var(--vscode-editor-fg);
                    margin: 0;
                }

                .learning-paths-subtitle {
                    color: var(--text-secondary);
                    font-size: 14px;
                    margin-bottom: 24px;
                }

                .paths-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .path-card {
                    background: var(--vscode-sideBar-bg);
                    border: 1px solid var(--vscode-sideBar-border);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: all 0.2s ease;
                }

                .path-card:hover {
                    border-color: var(--vscode-focusBorder);
                }

                .path-card.active {
                    border-color: var(--vscode-focusBorder);
                    box-shadow: 0 0 0 1px var(--vscode-focusBorder);
                }

                .path-header {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    cursor: pointer;
                    gap: 12px;
                }

                .path-header:hover {
                    background: var(--vscode-list-hoverBg);
                }

                .path-icon {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--vscode-list-hoverBg);
                    border-radius: 10px;
                }

                .path-icon .material-icons {
                    font-size: 24px;
                    color: var(--vscode-focusBorder);
                }

                .path-info {
                    flex: 1;
                }

                .path-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--vscode-editor-fg);
                    margin-bottom: 4px;
                }

                .path-meta {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .difficulty-badge {
                    font-size: 11px;
                    font-weight: 600;
                    padding: 2px 8px;
                    border-radius: 4px;
                    border: 1px solid;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .duration {
                    color: var(--text-secondary);
                    font-size: 12px;
                }

                .expand-icon {
                    color: var(--text-secondary);
                    font-size: 12px;
                    transition: transform 0.2s ease;
                }

                .path-card.expanded .expand-icon {
                    transform: rotate(0);
                }

                .progress-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 0 16px 16px;
                }

                .progress-bar {
                    flex: 1;
                    height: 6px;
                    background: var(--vscode-sideBar-border);
                    border-radius: 3px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    border-radius: 3px;
                    transition: width 0.3s ease;
                }

                .progress-text {
                    color: var(--text-secondary);
                    font-size: 12px;
                    min-width: 40px;
                    text-align: right;
                }

                .expanded-content {
                    padding: 0 16px 16px;
                    border-top: 1px solid var(--vscode-sideBar-border);
                }

                .path-description {
                    color: var(--text-secondary);
                    font-size: 13px;
                    margin: 16px 0;
                    line-height: 1.5;
                }

                .topics-list {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 16px;
                }

                .topic-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 12px;
                    background: var(--vscode-list-hoverBg);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-left: 3px solid transparent;
                }

                .topic-item:hover {
                    background: var(--vscode-list-activeSelectionBg);
                }

                .topic-item.completed {
                    border-left-color: #00d4aa;
                }

                .topic-number {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--vscode-sideBar-border);
                    border-radius: 50%;
                    color: var(--vscode-editor-fg);
                    font-size: 12px;
                    font-weight: 600;
                }

                .topic-item.completed .topic-number {
                    background: rgba(0, 212, 170, 0.2);
                    color: #00d4aa;
                }

                .topic-name {
                    flex: 1;
                    color: var(--vscode-editor-fg);
                    font-size: 14px;
                }

                .checkmark {
                    color: #00d4aa;
                    font-size: 16px;
                    font-weight: 600;
                }

                .start-button {
                    width: 100%;
                    padding: 12px;
                    background: var(--vscode-button-bg);
                    border: none;
                    border-radius: 6px;
                    color: var(--vscode-button-fg);
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                }

                .start-button:hover {
                    background: var(--vscode-button-hoverBg);
                }
            `}</style>
        </div>
    );
}
