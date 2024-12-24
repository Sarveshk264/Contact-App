// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAJV_KV3ialNGi8KMZ5AeembSd9OjRwrPs",
  authDomain: "vite-contact-7017d.firebaseapp.com",
  projectId: "vite-contact-7017d",
  storageBucket: "vite-contact-7017d.firebasestorage.app",
  messagingSenderId: "927261620380",
  appId: "1:927261620380:web:2769669d7a224c1210d559",
  measurementId: "G-VWGDCBNLPV"
};

// Initialize Firebase
let app, db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { db, app };