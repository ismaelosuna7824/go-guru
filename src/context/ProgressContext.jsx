import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

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

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('go-guru-visited', JSON.stringify(visitedIds));
    }, [visitedIds]);

    useEffect(() => {
        if (lastTopicId) {
            localStorage.setItem('go-guru-last-topic', lastTopicId);
        }
    }, [lastTopicId]);

    const updateCurrentTopic = (topicId) => {
        if (!topicId) return;
        setLastTopicId(topicId);
    };

    const markAsCompleted = (topicId) => {
        if (!topicId) return;

        // Add to visited if not already there
        setVisitedIds(prev => {
            if (!prev.includes(topicId)) {
                return [...prev, topicId];
            }
            return prev;
        });
    };

    const resetProgress = () => {
        setVisitedIds([]);
        setLastTopicId(null);
        localStorage.removeItem('go-guru-visited');
        localStorage.removeItem('go-guru-last-topic');
    };

    const value = {
        visitedIds,
        lastTopicId,
        updateCurrentTopic,
        markAsCompleted,
        resetProgress
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
