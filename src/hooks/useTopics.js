import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '../firebase';
import { CATEGORY_ORDER } from '../data/constants';

/**
 * Custom hook to fetch topics from Firestore
 * @returns {Object} - { topics, loading, error }
 */
export function useTopics() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchTopics() {
            try {
                setLoading(true);
                setError(null);

                // Query topics collection
                const topicsRef = collection(firestore, 'topics');
                const q = query(topicsRef, orderBy('id'));


                const querySnapshot = await getDocs(q);

                let topicsData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    // Ensure the ID is preserved
                    id: doc.id
                }));

                // Sort topics: Priority = Category Order > Special Topics > Alphabetical Title
                topicsData.sort((a, b) => {
                    // 1. Sort by Category
                    const catIndexA = CATEGORY_ORDER.indexOf(a.category);
                    const catIndexB = CATEGORY_ORDER.indexOf(b.category);

                    // Treat uncategorized as "end of list"
                    const safeA = catIndexA === -1 ? 999 : catIndexA;
                    const safeB = catIndexB === -1 ? 999 : catIndexB;

                    if (safeA !== safeB) return safeA - safeB;

                    // 2. Inside logical category, handle special topics (Installation, Hello World)
                    const firstTopics = ['installation', 'hello-world'];
                    const indexA = firstTopics.indexOf(a.id);
                    const indexB = firstTopics.indexOf(b.id);

                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                    if (indexA !== -1) return -1;
                    if (indexB !== -1) return 1;

                    // 3. Otherwise, sort alphabetically by Title for UI consistency
                    return a.title.localeCompare(b.title);
                });

                // Add display index to each topic (for sidebar numbering)
                topicsData = topicsData.map((topic, index) => ({
                    ...topic,
                    displayIndex: index + 1
                }));

                if (isMounted) {
                    setTopics(topicsData);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching topics from Firestore:', err);

                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            }
        }

        fetchTopics();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []);

    return { topics, loading, error };
}
