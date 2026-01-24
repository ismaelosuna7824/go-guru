/**
 * Script to generate sitemap.xml from Firestore topics
 * Run with: node scripts/generateSitemap.js
 * Auto-runs during build process
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Your production URL - UPDATE THIS!
const SITE_URL = 'https://goguru.com'; // TODO: Update with your actual production URL

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Generate sitemap.xml from Firestore topics
 */
async function generateSitemap() {
    try {
        console.log('🗺️  Generating sitemap.xml from Firestore...\n');

        // Fetch all topics from Firestore
        const topicsRef = collection(db, 'topics');
        const q = query(topicsRef, orderBy('id'));
        const querySnapshot = await getDocs(q);

        const topics = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(`📚 Found ${topics.length} topics\n`);

        // Group topics by category for priority calculation
        const categoryCounts = {};
        topics.forEach(topic => {
            categoryCounts[topic.category] = (categoryCounts[topic.category] || 0) + 1;
        });

        // Generate XML
        const currentDate = new Date().toISOString().split('T')[0];

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add homepage
        xml += '  <url>\n';
        xml += `    <loc>${SITE_URL}/</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>1.0</priority>\n';
        xml += '  </url>\n';

        // Add each topic
        topics.forEach(topic => {
            // Calculate priority based on category importance
            let priority = '0.8';
            if (topic.category === 'Getting Started') {
                priority = '0.9'; // Higher priority for getting started content
            } else if (topic.category === 'Basic Data Types & Variables' || topic.category === 'Control Flow') {
                priority = '0.85';
            }

            xml += '  <url>\n';
            xml += `    <loc>${SITE_URL}/${topic.id}</loc>\n`;
            xml += `    <lastmod>${currentDate}</lastmod>\n`;
            xml += '    <changefreq>monthly</changefreq>\n';
            xml += `    <priority>${priority}</priority>\n`;
            xml += '  </url>\n';
        });

        xml += '</urlset>\n';

        // Write to public directory (Vite serves files from public/)
        const publicDir = join(__dirname, '../public');
        const sitemapPath = join(publicDir, 'sitemap.xml');

        writeFileSync(sitemapPath, xml, 'utf-8');

        console.log('✅ Sitemap generated successfully!');
        console.log(`📍 Location: ${sitemapPath}`);
        console.log(`🔗 Will be accessible at: ${SITE_URL}/sitemap.xml\n`);

        console.log('📊 Sitemap Statistics:');
        console.log(`   Total URLs: ${topics.length + 1} (1 homepage + ${topics.length} topics)`);
        console.log(`   Categories: ${Object.keys(categoryCounts).length}`);
        console.log('   Top categories:');

        Object.entries(categoryCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .forEach(([category, count]) => {
                console.log(`     - ${category}: ${count} topics`);
            });

        console.log('\n✨ Next steps:');
        console.log('   1. Update SITE_URL in scripts/generateSitemap.js with your production URL');
        console.log('   2. Submit sitemap to Google Search Console: https://search.google.com/search-console');
        console.log('   3. Add to robots.txt: Sitemap: https://your-domain.com/sitemap.xml');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

// Run the generator
generateSitemap();
