import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

// Get the collection name from environment variable
const COLLECTION_NAME = import.meta.env.VITE_TOPICS_COLLECTION || 'topics';

/**
 * Fetches all topics from Firestore
 * @returns {Promise<Array>} Array of topic objects
 */
export async function fetchTopics() {
  try {
    const topicsCollection = collection(db, COLLECTION_NAME);
    const topicsQuery = query(topicsCollection, orderBy("order", "asc"));
    const querySnapshot = await getDocs(topicsQuery);

    const topics = [];
    querySnapshot.forEach((doc) => {
      topics.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return topics;
  } catch (error) {
    console.error("Error fetching topics from Firestore:", error);
    throw error;
  }
}

/**
 * Fetches a single topic by ID from Firestore
 * @param {string} topicId - The ID of the topic to fetch
 * @returns {Promise<Object|null>} The topic object or null if not found
 */
export async function fetchTopicById(topicId) {
  try {
    const topics = await fetchTopics();
    return topics.find(topic => topic.id === topicId) || null;
  } catch (error) {
    console.error(`Error fetching topic ${topicId}:`, error);
    throw error;
  }
}
