import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';

/**
 * Progress Dashboard showing XP, level, streak, and achievements
 */
export default function ProgressDashboard({ isOpen, onClose, totalTopics = 0 }) {
    const {
        stats,
        achievements,
        unlockedAchievements,
        streakData,
        resetProgress
    } = useProgress();

    const [showResetConfirm, setShowResetConfirm] = useState(false);

    if (!isOpen) return null;

    const completionPercentage = totalTopics > 0
        ? Math.round((stats.completedTopics / totalTopics) * 100)
        : 0;

    const handleReset = () => {
        resetProgress();
        setShowResetConfirm(false);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 999,
                    backdropFilter: 'blur(4px)'
                }}
            />

            {/* Modal */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'linear-gradient(180deg, #1e2d3d 0%, #0d1b2a 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '80vh',
                overflowY: 'auto',
                zIndex: 1000,
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px'
                }}>
                    <h2 style={{
                        margin: 0,
                        color: '#ffffff',
                        fontSize: '20px',
                        fontWeight: 600
                    }}>
                        🎮 Tu Progreso
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#8b9dc3',
                            fontSize: '24px',
                            cursor: 'pointer',
                            padding: '4px'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Level and XP Section */}
                <div style={{
                    background: 'rgba(0, 212, 170, 0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    border: '1px solid rgba(0, 212, 170, 0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px'
                    }}>
                        <div>
                            <div style={{
                                fontSize: '32px',
                                fontWeight: 700,
                                color: '#00d4aa'
                            }}>
                                Nivel {stats.level}
                            </div>
                            <div style={{
                                fontSize: '14px',
                                color: '#8b9dc3'
                            }}>
                                {stats.xp} XP total
                            </div>
                        </div>
                        <div style={{
                            fontSize: '48px'
                        }}>
                            {stats.level >= 10 ? '🏆' : stats.level >= 5 ? '⭐' : '🎯'}
                        </div>
                    </div>

                    {/* XP Progress Bar */}
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '10px',
                        height: '12px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${stats.xpProgress}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #00d4aa 0%, #00ffcc 100%)',
                            borderRadius: '10px',
                            transition: 'width 0.5s ease'
                        }} />
                    </div>
                    <div style={{
                        fontSize: '12px',
                        color: '#8b9dc3',
                        marginTop: '8px',
                        textAlign: 'right'
                    }}>
                        {stats.xpToNextLevel} XP para nivel {stats.level + 1}
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                    marginBottom: '24px'
                }}>
                    {/* Topics Completed */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '28px', color: '#ffffff', fontWeight: 700 }}>
                            {stats.completedTopics}
                        </div>
                        <div style={{ fontSize: '11px', color: '#8b9dc3', marginTop: '4px' }}>
                            Temas Completados
                        </div>
                    </div>

                    {/* Current Streak */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '28px', color: '#ff6b35', fontWeight: 700 }}>
                            {streakData.currentStreak}🔥
                        </div>
                        <div style={{ fontSize: '11px', color: '#8b9dc3', marginTop: '4px' }}>
                            Racha Actual
                        </div>
                    </div>

                    {/* Completion */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '28px', color: '#ffd700', fontWeight: 700 }}>
                            {completionPercentage}%
                        </div>
                        <div style={{ fontSize: '11px', color: '#8b9dc3', marginTop: '4px' }}>
                            Completado
                        </div>
                    </div>
                </div>

                {/* Completion Progress Bar */}
                {totalTopics > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                        }}>
                            <span style={{ fontSize: '13px', color: '#ffffff' }}>
                                Progreso del Curso
                            </span>
                            <span style={{ fontSize: '13px', color: '#8b9dc3' }}>
                                {stats.completedTopics} / {totalTopics} temas
                            </span>
                        </div>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            height: '8px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${completionPercentage}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #ffd700 0%, #ff9500 100%)',
                                borderRadius: '8px',
                                transition: 'width 0.5s ease'
                            }} />
                        </div>
                    </div>
                )}

                {/* Achievements Section */}
                <div>
                    <h3 style={{
                        margin: '0 0 16px 0',
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 600
                    }}>
                        🏅 Logros ({unlockedAchievements.length}/{achievements.length})
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px'
                    }}>
                        {achievements.map(achievement => {
                            const isUnlocked = unlockedAchievements.includes(achievement.id);
                            return (
                                <div
                                    key={achievement.id}
                                    style={{
                                        background: isUnlocked
                                            ? 'rgba(0, 212, 170, 0.15)'
                                            : 'rgba(255, 255, 255, 0.03)',
                                        border: isUnlocked
                                            ? '1px solid rgba(0, 212, 170, 0.3)'
                                            : '1px solid rgba(255, 255, 255, 0.05)',
                                        borderRadius: '10px',
                                        padding: '14px',
                                        opacity: isUnlocked ? 1 : 0.5,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        marginBottom: '6px'
                                    }}>
                                        <span style={{
                                            fontSize: '24px',
                                            filter: isUnlocked ? 'none' : 'grayscale(100%)'
                                        }}>
                                            {achievement.icon}
                                        </span>
                                        <span style={{
                                            color: isUnlocked ? '#ffffff' : '#5a6a8a',
                                            fontSize: '13px',
                                            fontWeight: 600
                                        }}>
                                            {achievement.title}
                                        </span>
                                    </div>
                                    <div style={{
                                        color: '#8b9dc3',
                                        fontSize: '11px',
                                        marginBottom: '4px'
                                    }}>
                                        {achievement.description}
                                    </div>
                                    <div style={{
                                        color: isUnlocked ? '#ffd700' : '#5a6a8a',
                                        fontSize: '10px',
                                        fontWeight: 600
                                    }}>
                                        +{achievement.xpReward} XP
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Reset Button */}
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    {!showResetConfirm ? (
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255, 100, 100, 0.3)',
                                color: '#ff6464',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '13px'
                            }}
                        >
                            Reiniciar Progreso
                        </button>
                    ) : (
                        <div style={{
                            background: 'rgba(255, 100, 100, 0.1)',
                            padding: '16px',
                            borderRadius: '8px'
                        }}>
                            <p style={{
                                color: '#ff6464',
                                margin: '0 0 12px 0',
                                fontSize: '14px'
                            }}>
                                ¿Estás seguro? Se perderá todo tu progreso.
                            </p>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button
                                    onClick={handleReset}
                                    style={{
                                        background: '#ff6464',
                                        border: 'none',
                                        color: '#ffffff',
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '13px'
                                    }}
                                >
                                    Sí, Reiniciar
                                </button>
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: 'none',
                                        color: '#ffffff',
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '13px'
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
