import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ProgressContext = createContext();

// Achievement definitions
const ACHIEVEMENTS = [
    {
        id: 'first-step',
        title: 'Primer Paso',
        description: 'Completar tu primer tema',
        icon: '🎯',
        condition: (stats) => stats.completedTopics >= 1,
        xpReward: 50
    },
    {
        id: 'getting-started',
        title: 'Iniciando el Viaje',
        description: 'Completar 5 temas',
        icon: '🚀',
        condition: (stats) => stats.completedTopics >= 5,
        xpReward: 100
    },
    {
        id: 'gopher-apprentice',
        title: 'Aprendiz Gopher',
        description: 'Completar 10 temas',
        icon: '🐹',
        condition: (stats) => stats.completedTopics >= 10,
        xpReward: 200
    },
    {
        id: 'gopher-master',
        title: 'Maestro Gopher',
        description: 'Completar 25 temas',
        icon: '🏆',
        condition: (stats) => stats.completedTopics >= 25,
        xpReward: 500
    },
    {
        id: 'streak-3',
        title: 'En Racha',
        description: 'Mantener una racha de 3 días',
        icon: '🔥',
        condition: (stats) => stats.currentStreak >= 3,
        xpReward: 75
    },
    {
        id: 'streak-7',
        title: 'Semana Perfecta',
        description: 'Mantener una racha de 7 días',
        icon: '⚡',
        condition: (stats) => stats.currentStreak >= 7,
        xpReward: 200
    },
    {
        id: 'streak-30',
        title: 'Dedicación Total',
        description: 'Mantener una racha de 30 días',
        icon: '💎',
        condition: (stats) => stats.currentStreak >= 30,
        xpReward: 1000
    },
    {
        id: 'explorer',
        title: 'Explorador',
        description: 'Visitar 15 temas diferentes',
        icon: '🧭',
        condition: (stats) => stats.visitedCount >= 15,
        xpReward: 100
    }
];

// XP required for each level
const XP_PER_LEVEL = 250;

export const useProgress = () => {
    return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }) => {
    // Load from localStorage or default
    const [visitedIds, setVisitedIds] = useState(() => {
        const saved = localStorage.getItem('go-guru-visited');
        return saved ? JSON.parse(saved) : [];
    });

    const [lastTopicId, setLastTopicId] = useState(() => {
        return localStorage.getItem('go-guru-last-topic') || null;
    });

    // New gamification state
    const [xp, setXp] = useState(() => {
        const saved = localStorage.getItem('go-guru-xp');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
        const saved = localStorage.getItem('go-guru-achievements');
        return saved ? JSON.parse(saved) : [];
    });

    const [streakData, setStreakData] = useState(() => {
        const saved = localStorage.getItem('go-guru-streak');
        return saved ? JSON.parse(saved) : {
            currentStreak: 0,
            lastActiveDate: null,
            longestStreak: 0
        };
    });

    // Notification queue for new achievements
    const [newAchievement, setNewAchievement] = useState(null);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('go-guru-visited', JSON.stringify(visitedIds));
    }, [visitedIds]);

    useEffect(() => {
        if (lastTopicId) {
            localStorage.setItem('go-guru-last-topic', lastTopicId);
        }
    }, [lastTopicId]);

    useEffect(() => {
        localStorage.setItem('go-guru-xp', xp.toString());
    }, [xp]);

    useEffect(() => {
        localStorage.setItem('go-guru-achievements', JSON.stringify(unlockedAchievements));
    }, [unlockedAchievements]);

    useEffect(() => {
        localStorage.setItem('go-guru-streak', JSON.stringify(streakData));
    }, [streakData]);

    // Calculate derived stats
    const stats = {
        completedTopics: visitedIds.length,
        visitedCount: visitedIds.length,
        currentStreak: streakData.currentStreak,
        longestStreak: streakData.longestStreak,
        xp,
        level: Math.floor(xp / XP_PER_LEVEL) + 1,
        xpToNextLevel: XP_PER_LEVEL - (xp % XP_PER_LEVEL),
        xpProgress: ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100
    };

    // Check and unlock achievements
    const checkAchievements = useCallback((currentStats) => {
        ACHIEVEMENTS.forEach(achievement => {
            if (!unlockedAchievements.includes(achievement.id) && achievement.condition(currentStats)) {
                setUnlockedAchievements(prev => [...prev, achievement.id]);
                setXp(prev => prev + achievement.xpReward);
                setNewAchievement(achievement);

                // Clear notification after 5 seconds
                setTimeout(() => setNewAchievement(null), 5000);
            }
        });
    }, [unlockedAchievements]);

    // Update streak based on activity
    const updateStreak = useCallback(() => {
        const today = new Date().toDateString();
        const lastActive = streakData.lastActiveDate;

        if (lastActive === today) {
            // Already active today, do nothing
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastActive === yesterdayStr) {
            // Continue streak
            const newStreak = streakData.currentStreak + 1;
            setStreakData({
                currentStreak: newStreak,
                lastActiveDate: today,
                longestStreak: Math.max(newStreak, streakData.longestStreak)
            });
        } else if (!lastActive) {
            // First time
            setStreakData({
                currentStreak: 1,
                lastActiveDate: today,
                longestStreak: 1
            });
        } else {
            // Streak broken
            setStreakData({
                currentStreak: 1,
                lastActiveDate: today,
                longestStreak: streakData.longestStreak
            });
        }
    }, [streakData]);

    const updateCurrentTopic = (topicId) => {
        if (!topicId) return;
        setLastTopicId(topicId);
        updateStreak();
    };

    const markAsCompleted = (topicId) => {
        if (!topicId) return;

        // Add to visited if not already there
        setVisitedIds(prev => {
            if (!prev.includes(topicId)) {
                const newVisited = [...prev, topicId];

                // Award XP for completing a topic
                setXp(prevXp => prevXp + 25);

                // Check achievements with updated stats
                setTimeout(() => {
                    checkAchievements({
                        completedTopics: newVisited.length,
                        visitedCount: newVisited.length,
                        currentStreak: streakData.currentStreak,
                        longestStreak: streakData.longestStreak
                    });
                }, 100);

                return newVisited;
            }
            return prev;
        });

        updateStreak();
    };

    const resetProgress = () => {
        setVisitedIds([]);
        setLastTopicId(null);
        setXp(0);
        setUnlockedAchievements([]);
        setStreakData({
            currentStreak: 0,
            lastActiveDate: null,
            longestStreak: 0
        });
        localStorage.removeItem('go-guru-visited');
        localStorage.removeItem('go-guru-last-topic');
        localStorage.removeItem('go-guru-xp');
        localStorage.removeItem('go-guru-achievements');
        localStorage.removeItem('go-guru-streak');
    };

    const dismissAchievement = () => {
        setNewAchievement(null);
    };

    // Add XP directly (for quizzes, challenges, etc.)
    const addXp = useCallback((amount) => {
        if (amount <= 0) return;
        setXp(prev => prev + amount);
        updateStreak();

        // Check achievements with updated XP
        setTimeout(() => {
            checkAchievements({
                completedTopics: visitedIds.length,
                visitedCount: visitedIds.length,
                currentStreak: streakData.currentStreak,
                longestStreak: streakData.longestStreak
            });
        }, 100);
    }, [visitedIds, streakData, checkAchievements, updateStreak]);

    const value = {
        visitedIds,
        lastTopicId,
        updateCurrentTopic,
        markAsCompleted,
        resetProgress,
        // Gamification
        stats,
        achievements: ACHIEVEMENTS,
        unlockedAchievements,
        newAchievement,
        dismissAchievement,
        streakData,
        addXp
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
