import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';

/**
 * Custom hook to fetch quizzes from Firestore
 * Quizzes can be associated with specific topics
 * 
 * Expected Firestore structure:
 * quizzes/{quizId}
 *   - topicId: string (references the topic)
 *   - title: string
 *   - questions: [
 *       {
 *         question: string,
 *         options: string[],
 *         correctAnswer: number (index),
 *         explanation?: string
 *       }
 *     ]
 *   - xpReward: number (XP for completing the quiz)
 *   - passingScore: number (percentage to pass, e.g., 70)
 */
export function useQuizzes(topicId = null) {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuizzes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const quizzesRef = collection(firestore, 'quizzes');

            let q;
            if (topicId) {
                // Fetch quiz for specific topic
                q = query(quizzesRef, where('topicId', '==', topicId));
            } else {
                // Fetch all quizzes
                q = query(quizzesRef);
            }

            const querySnapshot = await getDocs(q);

            const quizzesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setQuizzes(quizzesData);
        } catch (err) {
            console.error('Error fetching quizzes:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [topicId]);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    // Get quiz for a specific topic
    const getQuizForTopic = useCallback((tid) => {
        return quizzes.find(q => q.topicId === tid) || null;
    }, [quizzes]);

    return {
        quizzes,
        loading,
        error,
        getQuizForTopic,
        refetch: fetchQuizzes
    };
}

// Hook for quiz state management
export function useQuizState(quiz) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const totalQuestions = quiz?.questions?.length || 0;

    const answerQuestion = useCallback((answerIndex) => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentQuestion] = answerIndex;
            return newAnswers;
        });
    }, [currentQuestion]);

    const nextQuestion = useCallback(() => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setIsCompleted(true);
            setShowResults(true);
        }
    }, [currentQuestion, totalQuestions]);

    const prevQuestion = useCallback(() => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    }, [currentQuestion]);

    const resetQuiz = useCallback(() => {
        setCurrentQuestion(0);
        setAnswers([]);
        setIsCompleted(false);
        setShowResults(false);
    }, []);

    // Calculate score
    const score = quiz?.questions?.reduce((acc, q, idx) => {
        return acc + (answers[idx] === q.correctAnswer ? 1 : 0);
    }, 0) || 0;

    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const passed = percentage >= (quiz?.passingScore || 70);

    return {
        currentQuestion,
        answers,
        isCompleted,
        showResults,
        totalQuestions,
        score,
        percentage,
        passed,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        resetQuiz,
        setShowResults
    };
}
