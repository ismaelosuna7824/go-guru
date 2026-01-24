/**
 * Script to migrate topics from local topics.js to Firestore
 * Run with: node scripts/migrateTopics.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
const envPath = join(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, '');
        envVars[key] = value;
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
    measurementId: envVars.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate config
const missingKeys = Object.keys(firebaseConfig).filter(key => !firebaseConfig[key]);
if (missingKeys.length > 0) {
    console.error(`❌ Missing Firebase configuration keys: ${missingKeys.join(', ')}`);
    console.error('Please check your .env.local file');
    process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Import topics (using dynamic import for ES modules)
async function loadTopics() {
    const module = await import('../src/data/topics.js');
    return module.topics;
}

async function migrateTopics() {
    try {
        console.log('🚀 Starting topics migration to Firestore...\n');

        const topics = await loadTopics();
        console.log(`📚 Found ${topics.length} topics to migrate\n`);

        // Use batch writes for efficiency (max 500 operations per batch)
        const batchSize = 500;
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < topics.length; i += batchSize) {
            const batch = writeBatch(db);
            const batchTopics = topics.slice(i, i + batchSize);

            batchTopics.forEach(topic => {
                const topicRef = doc(db, 'topics', topic.id);
                batch.set(topicRef, topic);
            });

            try {
                await batch.commit();
                successCount += batchTopics.length;
                console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}: Migrated ${batchTopics.length} topics (${successCount}/${topics.length})`);
            } catch (error) {
                errorCount += batchTopics.length;
                console.error(`❌ Error in batch ${Math.floor(i / batchSize) + 1}:`, error.message);
            }
        }

        console.log('\n' + '='.repeat(50));
        console.log('📊 Migration Summary:');
        console.log('='.repeat(50));
        console.log(`Total topics: ${topics.length}`);
        console.log(`✅ Successfully migrated: ${successCount}`);
        console.log(`❌ Failed: ${errorCount}`);
        console.log('='.repeat(50));

        if (errorCount === 0) {
            console.log('\n🎉 Migration completed successfully!');
            console.log('✨ You can now view your topics in Firebase Console:');
            console.log(`   https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/data/topics`);
        } else {
            console.log('\n⚠️  Migration completed with errors. Please check the logs above.');
        }

        process.exit(errorCount === 0 ? 0 : 1);
    } catch (error) {
        console.error('\n❌ Fatal error during migration:', error);
        process.exit(1);
    }
}

// Run migration
migrateTopics();
