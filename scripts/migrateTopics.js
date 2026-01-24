/**
 * Script to migrate topics to Firestore
 * 
 * NOTE: This script was originally used for the initial migration from topics.js to Firestore.
 * Topics are now managed directly in Firestore. This script is kept for reference.
 * 
 * To add/update topics, use Firebase Console:
 * https://console.firebase.google.com/project/goguru-71888/firestore/data/topics
 * 
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


async function migrateTopics() {
    console.log('⚠️  This script is deprecated.');
    console.log('📝 Topics are now managed directly in Firestore.\n');
    console.log('To manage topics:');
    console.log('1. Go to Firebase Console:');
    console.log(`   https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/data/topics\n`);
    console.log('2. Add/Edit topics directly in the Firestore UI');
    console.log('3. Topics will automatically appear in your app\n');
    console.log('💡 Tip: The original topics.js has been backed up to src/data/topics.js.backup');

    process.exit(0);
}

// Run migration
migrateTopics();
