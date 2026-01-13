/**
 * Migration Script: Local topics.js → Firestore
 *
 * This script migrates all topics from the local data file to Firestore.
 * Run this script with: node migrate-to-firestore.js
 *
 * Make sure to set VITE_TOPICS_COLLECTION in your .env file before running.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch } from 'firebase/firestore';
import { topics } from './src/data/topics.js';
import { readFileSync } from 'fs';

// Load environment variables from .env file
const envFile = readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    const value = valueParts.join('=').trim();
    if (key.startsWith('VITE_')) {
      envVars[key] = value;
    }
  }
});

// Firebase configuration
const firebaseConfig = {
  apiKey: envVars.VITE_FIREBASE_API_KEY,
  authDomain: envVars.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envVars.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.VITE_FIREBASE_APP_ID,
};

// Get the collection name from environment
const COLLECTION_NAME = envVars.VITE_TOPICS_COLLECTION || 'topics';

console.log(`\n🚀 Starting migration to Firestore collection: "${COLLECTION_NAME}"\n`);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Migrates topics to Firestore using batched writes
 */
async function migrateTopics() {
  try {
    console.log(`📊 Found ${topics.length} topics to migrate\n`);

    // Firestore has a limit of 500 operations per batch
    const BATCH_SIZE = 500;
    let batch = writeBatch(db);
    let operationCount = 0;
    let batchCount = 0;

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];

      // Create document reference with topic.id as the document ID
      const topicRef = doc(collection(db, COLLECTION_NAME), topic.id);

      // Add order field based on array index to maintain order
      const topicData = {
        ...topic,
        order: i + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      batch.set(topicRef, topicData);
      operationCount++;

      // Commit batch when we reach the limit
      if (operationCount === BATCH_SIZE) {
        console.log(`📝 Committing batch ${++batchCount} (${BATCH_SIZE} documents)...`);
        await batch.commit();
        batch = writeBatch(db);
        operationCount = 0;
      }

      // Show progress
      if ((i + 1) % 10 === 0 || i === topics.length - 1) {
        console.log(`   Progress: ${i + 1}/${topics.length} topics processed`);
      }
    }

    // Commit any remaining operations
    if (operationCount > 0) {
      console.log(`📝 Committing final batch ${++batchCount} (${operationCount} documents)...`);
      await batch.commit();
    }

    console.log(`\n✅ Migration completed successfully!`);
    console.log(`   Total topics migrated: ${topics.length}`);
    console.log(`   Collection name: ${COLLECTION_NAME}`);
    console.log(`   Firestore project: ${firebaseConfig.projectId}\n`);

  } catch (error) {
    console.error('\n❌ Error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
migrateTopics()
  .then(() => {
    console.log('🎉 Migration script completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration script failed:', error);
    process.exit(1);
  });
