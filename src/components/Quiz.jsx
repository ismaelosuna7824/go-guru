import React, { useState } from 'react';
import { useQuizzes, useQuizState } from '../hooks/useQuizzes';
import { useProgress } from '../context/ProgressContext';

/**
 * Interactive Quiz component that integrates with Firebase quizzes
 * Shows at the end of topics to test understanding
 */
export default function Quiz({ topicId, onComplete }) {
    const { quizzes, loading } = useQuizzes(topicId);
    const quiz = quizzes[0]; // Get first quiz for this topic
    const quizState = useQuizState(quiz);
    const { addXp } = useProgress();
    const [hasClaimedXp, setHasClaimedXp] = useState(false);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <span style={{ color: '#8b9dc3', marginTop: '8px' }}>Cargando quiz...</span>
            </div>
        );
    }

    if (!quiz) {
        return null; // No quiz for this topic
    }

    const {
        currentQuestion,
        answers,
        showResults,
        totalQuestions,
        score,
        percentage,
        passed,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        resetQuiz
    } = quizState;

    const currentQ = quiz.questions[currentQuestion];
    const selectedAnswer = answers[currentQuestion];

    const handleClaimXp = () => {
        if (!hasClaimedXp && passed) {
            addXp(quiz.xpReward || 50);
            setHasClaimedXp(true);
            if (onComplete) onComplete(true, percentage);
        }
    };

    // Results View
    if (showResults) {
        return (
            <div style={styles.container}>
                <div style={styles.resultsCard}>
                    {/* Result Icon */}
                    <div style={{
                        fontSize: '64px',
                        marginBottom: '16px',
                        animation: 'resultBounce 0.6s ease-out'
                    }}>
                        {passed ? '🎉' : '📚'}
                    </div>

                    {/* Score */}
                    <div style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        color: passed ? '#00d4aa' : '#ff6b35',
                        marginBottom: '8px'
                    }}>
                        {percentage}%
                    </div>

                    <div style={{
                        color: '#ffffff',
                        fontSize: '20px',
                        fontWeight: 600,
                        marginBottom: '8px'
                    }}>
                        {passed ? '¡Excelente trabajo!' : 'Sigue practicando'}
                    </div>

                    <div style={{
                        color: '#8b9dc3',
                        fontSize: '14px',
                        marginBottom: '24px'
                    }}>
                        Respondiste {score} de {totalQuestions} correctamente
                    </div>

                    {/* XP Reward */}
                    {passed && !hasClaimedXp && (
                        <button
                            onClick={handleClaimXp}
                            style={styles.claimButton}
                        >
                            <span style={{ fontSize: '18px' }}>✨</span>
                            Reclamar +{quiz.xpReward || 50} XP
                        </button>
                    )}

                    {hasClaimedXp && (
                        <div style={{
                            color: '#00d4aa',
                            fontSize: '14px',
                            fontWeight: 600,
                            padding: '12px 24px',
                            background: 'rgba(0, 212, 170, 0.1)',
                            borderRadius: '8px',
                            marginBottom: '16px'
                        }}>
                            ✓ +{quiz.xpReward || 50} XP añadidos
                        </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button
                            onClick={resetQuiz}
                            style={styles.secondaryButton}
                        >
                            Intentar de nuevo
                        </button>
                    </div>
                </div>

                <style>{`
                    @keyframes resultBounce {
                        0% { transform: scale(0); }
                        50% { transform: scale(1.2); }
                        100% { transform: scale(1); }
                    }
                `}</style>
            </div>
        );
    }

    // Quiz Question View
    return (
        <div style={styles.container}>
            <div style={styles.quizCard}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.quizTitle}>
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>📝</span>
                        {quiz.title}
                    </div>
                    <div style={styles.progress}>
                        <div style={{
                            ...styles.progressBar,
                            width: `${((currentQuestion + 1) / totalQuestions) * 100}%`
                        }} />
                    </div>
                    <div style={styles.questionCount}>
                        Pregunta {currentQuestion + 1} de {totalQuestions}
                    </div>
                </div>

                {/* Question */}
                <div style={styles.questionText}>
                    {currentQ.question}
                </div>

                {/* Options */}
                <div style={styles.options}>
                    {currentQ.options.map((option, idx) => {
                        const isSelected = selectedAnswer === idx;
                        return (
                            <button
                                key={idx}
                                onClick={() => answerQuestion(idx)}
                                style={{
                                    ...styles.optionButton,
                                    ...(isSelected ? styles.optionButtonSelected : {})
                                }}
                            >
                                <span style={styles.optionLetter}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span style={styles.optionText}>{option}</span>
                                {isSelected && (
                                    <span style={styles.checkMark}>✓</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Navigation */}
                <div style={styles.navigation}>
                    <button
                        onClick={prevQuestion}
                        disabled={currentQuestion === 0}
                        style={{
                            ...styles.navButton,
                            opacity: currentQuestion === 0 ? 0.4 : 1
                        }}
                    >
                        ← Anterior
                    </button>
                    <button
                        onClick={nextQuestion}
                        disabled={selectedAnswer === undefined}
                        style={{
                            ...styles.navButton,
                            ...styles.navButtonPrimary,
                            opacity: selectedAnswer === undefined ? 0.4 : 1
                        }}
                    >
                        {currentQuestion === totalQuestions - 1 ? 'Finalizar' : 'Siguiente →'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Styles
const styles = {
    container: {
        marginTop: '32px',
        animation: 'fadeIn 0.5s ease-out'
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px',
        color: '#8b9dc3'
    },
    spinner: {
        width: '32px',
        height: '32px',
        border: '3px solid rgba(0, 212, 170, 0.2)',
        borderTop: '3px solid #00d4aa',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    quizCard: {
        background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.8) 0%, rgba(13, 33, 55, 0.9) 100%)',
        border: '1px solid rgba(0, 212, 170, 0.3)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    },
    resultsCard: {
        background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.8) 0%, rgba(13, 33, 55, 0.9) 100%)',
        border: '1px solid rgba(0, 212, 170, 0.3)',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    },
    header: {
        marginBottom: '24px'
    },
    quizTitle: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center'
    },
    progress: {
        height: '4px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginBottom: '8px'
    },
    progressBar: {
        height: '100%',
        background: 'linear-gradient(90deg, #00d4aa, #00b894)',
        borderRadius: '2px',
        transition: 'width 0.3s ease'
    },
    questionCount: {
        color: '#8b9dc3',
        fontSize: '12px'
    },
    questionText: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 500,
        marginBottom: '24px',
        lineHeight: 1.5
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '24px'
    },
    optionButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'left',
        color: '#ffffff'
    },
    optionButtonSelected: {
        background: 'rgba(0, 212, 170, 0.15)',
        borderColor: '#00d4aa'
    },
    optionLetter: {
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 212, 170, 0.2)',
        borderRadius: '8px',
        color: '#00d4aa',
        fontWeight: 600,
        fontSize: '14px',
        flexShrink: 0
    },
    optionText: {
        flex: 1,
        fontSize: '14px'
    },
    checkMark: {
        color: '#00d4aa',
        fontSize: '18px',
        fontWeight: 600
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px'
    },
    navButton: {
        padding: '12px 24px',
        background: 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    navButtonPrimary: {
        background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
        color: '#0d1b2a'
    },
    claimButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 28px',
        background: 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)',
        border: 'none',
        borderRadius: '12px',
        color: '#0d1b2a',
        fontSize: '16px',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(255, 215, 0, 0.4)',
        transition: 'all 0.2s ease',
        animation: 'claimPulse 2s ease-in-out infinite'
    },
    secondaryButton: {
        padding: '12px 24px',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    }
};
