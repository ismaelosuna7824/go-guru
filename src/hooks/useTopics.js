import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '../firebase';

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

                const topicsData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    // Ensure the ID is preserved
                    id: doc.id
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
