import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '../firebase';

/**
 * Custom hook to fetch learning paths from Firestore
 * 
 * Expected Firestore structure:
 * learningPaths/{pathId}
 *   - id: string
 *   - title: string (e.g., "Go Web Developer")
 *   - description: string
 *   - icon: string (emoji)
 *   - difficulty: string ("beginner" | "intermediate" | "advanced")
 *   - estimatedHours: number
 *   - topics: string[] (array of topic IDs in order)
 *   - order: number (display order)
 */
export function useLearningPaths() {
    const [paths, setPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPaths = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const pathsRef = collection(firestore, 'learningPaths');
            const q = query(pathsRef, orderBy('order'));

            const querySnapshot = await getDocs(q);

            const pathsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Use default paths if Firestore is empty
            if (pathsData.length === 0) {
                setPaths(getDefaultPaths());
            } else {
                setPaths(pathsData);
            }
        } catch (err) {
            console.error('Error fetching learning paths:', err);
            setError(err.message);

            // Return default paths if Firestore fails
            setPaths(getDefaultPaths());
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPaths();
    }, [fetchPaths]);

    return {
        paths,
        loading,
        error,
        refetch: fetchPaths
    };
}

// Default learning paths (fallback if Firestore is empty)
function getDefaultPaths() {
    return [
        {
            id: 'go-basics',
            title: 'Fundamentos de Go',
            description: 'Aprende los conceptos básicos de Go desde cero',
            icon: 'school',
            difficulty: 'beginner',
            estimatedHours: 5,
            topics: [
                'installation',
                'hello-world',
                'variables',
                'constants',
                'data-types',
                'pointers',
                'strings-runes'
            ],
            order: 1
        },
        {
            id: 'go-control-flow',
            title: 'Control de Flujo',
            description: 'Domina las estructuras de control en Go',
            icon: 'alt_route',
            difficulty: 'beginner',
            estimatedHours: 4,
            topics: [
                'for',
                'if-else',
                'switch'
            ],
            order: 2
        },
        {
            id: 'go-functions',
            title: 'Funciones y Métodos',
            description: 'Aprende a crear funciones reutilizables',
            icon: 'functions',
            difficulty: 'intermediate',
            estimatedHours: 6,
            topics: [
                'functions',
                'closures',
                'recursion',
                'variadic-functions',
                'multiple-return-values'
            ],
            order: 3
        },
        {
            id: 'go-data-structures',
            title: 'Estructuras de Datos',
            description: 'Domina arrays, slices, maps y structs',
            icon: 'inventory_2',
            difficulty: 'intermediate',
            estimatedHours: 8,
            topics: [
                'arrays',
                'slices',
                'maps',
                'structs',
                'make',
                'enums'
            ],
            order: 4
        },
        {
            id: 'go-oop',
            title: 'OOP en Go',
            description: 'Interfaces, embedding y patrones OOP',
            icon: 'extension',
            difficulty: 'intermediate',
            estimatedHours: 6,
            topics: [
                'interfaces',
                'generics',
                'methods',
                'struct-embedding',
                'dependency-injection'
            ],
            order: 5
        },
        {
            id: 'go-concurrency',
            title: 'Concurrencia',
            description: 'Goroutines, channels y patrones de concurrencia',
            icon: 'bolt',
            difficulty: 'advanced',
            estimatedHours: 10,
            topics: [
                'goroutines',
                'channels',
                'channel-select',
                'mutexes',
                'wait-groups',
                'context'
            ],
            order: 6
        },
        {
            id: 'go-web',
            title: 'Desarrollo Web',
            description: 'Crea aplicaciones web con Go',
            icon: 'language',
            difficulty: 'advanced',
            estimatedHours: 12,
            topics: [
                'http-client',
                'http-server',
                'web-frameworks-gin-echo-fiber',
                'realtime-communication-websockets-sse'
            ],
            order: 7
        }
    ];
}

// Hook to track progress in a learning path
export function useLearningPathProgress(pathId, visitedIds = []) {
    const { paths } = useLearningPaths();

    const path = paths.find(p => p.id === pathId);

    if (!path) {
        return {
            path: null,
            completedTopics: 0,
            totalTopics: 0,
            percentage: 0,
            nextTopic: null,
            isCompleted: false
        };
    }

    const completedTopics = path.topics.filter(t => visitedIds.includes(t)).length;
    const totalTopics = path.topics.length;
    const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    const nextTopic = path.topics.find(t => !visitedIds.includes(t)) || null;
    const isCompleted = completedTopics === totalTopics;

    return {
        path,
        completedTopics,
        totalTopics,
        percentage,
        nextTopic,
        isCompleted
    };
}
