// /lib/firebase.ts
import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage"; 
import { getDatabase } from "firebase/database"; 
import { getAuth } from "firebase/auth"; // Optional



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCi3qfiJzZUWs6FeMRYAILVM4iMR5RkknE",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "homify-furniture.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "homify-furniture",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "homify-furniture.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "78671235708",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:78671235708:web:ffa2aaa0ec6ef716e897f9",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://homify-furniture-default-rtdb.firebaseio.com", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
// export const storage = getStorage(app);
export const database = getDatabase(app);
export const auth = getAuth(app); // Optional
export default app;