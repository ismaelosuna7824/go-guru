import { ref, push, set, onValue, update, get, serverTimestamp } from "firebase/database";
import { db } from "../firebase";

export const battleService = {
    /**
     * Create a new battle room
     * @param {string} hostName 
     * @returns {Promise<string>} roomId
     */
    createRoom: async (hostName) => {
        const roomsRef = ref(db, 'battles');
        const newRoomRef = push(roomsRef);

        await set(newRoomRef, {
            createdAt: serverTimestamp(),
            status: 'waiting', // waiting, playing, finished
            host: hostName,
            players: {
                [newRoomRef.key]: {
                    name: hostName,
                    score: 0,
                    status: 'ready'
                }
            },
            currentChallenge: null
        });

        return newRoomRef.key;
    },

    /**
     * Join an existing room
     * @param {string} roomId 
     * @param {string} playerName 
     * @param {string} playerId (optional, uses auth or generates one normally)
     */
    joinRoom: async (roomId, playerName, playerId) => {
        // If no playerId provided, we use a simple random one or reuse name if unique
        // But better to let caller handle ID generation. 
        // For now we'll assume playerId is passed or we generate a simple one.
        const uid = playerId || `player_${Date.now()}`;

        const playerRef = ref(db, `battles/${roomId}/players/${uid}`);
        await set(playerRef, {
            name: playerName,
            score: 0,
            status: 'ready'
        });

        return uid;
    },

    /**
     * Subscribe to room updates
     * @param {string} roomId 
     * @param {function} callback 
     * @returns {function} unsubscribe
     */
    subscribeToRoom: (roomId, callback) => {
        const roomRef = ref(db, `battles/${roomId}`);
        const unsubscribe = onValue(roomRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                callback(data);
            } else {
                callback(null); // Room might be deleted
            }
        });

        return unsubscribe;
    },

    /**
     * Update game status (e.g. start game)
     */
    updateRoomStatus: async (roomId, status) => {
        const roomRef = ref(db, `battles/${roomId}`);
        await update(roomRef, { status });
    },

    /**
     * Set the current challenge
     */
    setChallenge: async (roomId, challenge) => {
        const roomRef = ref(db, `battles/${roomId}`);
        await update(roomRef, {
            currentChallenge: challenge,
            status: 'playing',
            startTime: serverTimestamp()
        });
    },

    /**
     * Add a point to a player
     */
    addPoint: async (roomId, playerId) => {
        const playerScoreRef = ref(db, `battles/${roomId}/players/${playerId}/score`);
        // We need to read first to increment (or use transaction)
        // Using transaction for safety
        // For simplicity here, just fetching and updating:
        const snapshot = await get(playerScoreRef);
        const specificRef = ref(db, `battles/${roomId}/players/${playerId}`);
        const currentScore = snapshot.val() || 0;

        await update(specificRef, { score: currentScore + 1 });
    },

    /**
     * Update player status (e.g., mark as solved)
     */
    updatePlayerStatus: async (roomId, playerId, status) => {
        const playerRef = ref(db, `battles/${roomId}/players/${playerId}`);
        await update(playerRef, { status });
    },

    /**
     * Delete/remove a battle room
     */
    deleteRoom: async (roomId) => {
        const roomRef = ref(db, `battles/${roomId}`);
        await set(roomRef, null); // Setting to null deletes the node
    },

    /**
     * Generate Challenge via API
     * @param {string} difficulty 
     * @param {string} language - 'es' or 'en'
     */
    generateChallenge: async (difficulty = 'medium', language = 'es') => {
        // Use the CloudFront/API Gateway endpoint in production, or local in dev
        // We can assume vite proxies /api or we use full URL
        // For now, let's assume we need to hit the API url. 
        // Since we don't have the deployment URL yet, we might need configuration.
        // I'll assume /api/generate is proxied or configured.

        // In local dev, standard might be http://localhost:3000/generate
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        try {
            const response = await fetch(`${apiUrl}/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ difficulty, language })
            });

            if (!response.ok) throw new Error('Failed to generate');
            return await response.json();
        } catch (err) {
            console.error("Challenge generation failed", err);
            throw err;
        }
    }
};
