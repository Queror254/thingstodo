// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, // Use environment variable
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, // Use environment variable
  projectId: process.env.FIREBASE_PROJECT_ID, // Use environment variable
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Use environment variable
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, // Use environment variable
  appId: process.env.FIREBASE_APP_ID, // Use environment variable
  measurementId: process.env.FIREBASE_MEASUREMENT_ID // Use environment variable
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };