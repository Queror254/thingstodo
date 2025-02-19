// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBdNq9bn3bN7e0BPhCBOXNnyFwR3tqfrsE",
  authDomain: "taskbuddy-f96fa.firebaseapp.com",
  projectId: "taskbuddy-f96fa",
  storageBucket: "taskbuddy-f96fa.firebasestorage.app",
  messagingSenderId: "392863307848",
  appId: "1:392863307848:web:1519e3033044f26d01a07d",
  measurementId: "G-BZPH4DEP59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };