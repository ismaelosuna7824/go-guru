import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate config
const missingKeys = Object.keys(firebaseConfig).filter(key => !firebaseConfig[key]);
if (missingKeys.length > 0) {
  console.error(`Missing Firebase configuration keys: ${missingKeys.join(', ')}. Check your .env file.`);
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Enable collection (just to be explicit)
setAnalyticsCollectionEnabled(analytics, true);

// Enable debug mode in development
const isDev = import.meta.env.DEV;
if (isDev) {
  // Enable debug mode for Firebase Analytics
  // This will send events to DebugView in Firebase Console
  window['GA_DEBUG_MODE'] = true;

  console.log("Firebase Analytics initialized");
  console.log("Debug mode enabled:", true);
}

export const logTopicView = (topic) => {
  const isDev = import.meta.env.DEV;

  if (!analytics) {
    console.warn("Analytics not initialized");
    return;
  }

  // Params setup - include debug_mode in development
  const eventParams = {
    content_type: "topic",
    item_id: topic.id,
    content_id: topic.title,
    category: topic.category,
    topic_name: topic.title,
    ...(isDev && { debug_mode: true }), // Enable debug mode for this event
  };

  // Debug logging in browser console
  if (isDev) {
    console.log(`[Analytics Debug] Topic View:`, {
      title: topic.title,
      id: topic.id,
      category: topic.category,
      params: eventParams,
    });
  }

  // Standard event
  logEvent(analytics, "select_content", eventParams);

  // Custom event
  logEvent(analytics, "view_topic", eventParams);

  if (isDev) {
    console.log("Events logged to DebugView: select_content, view_topic");
  }
};

export { analytics, app, db };
