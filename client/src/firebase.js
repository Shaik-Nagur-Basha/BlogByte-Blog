// Firebase — used for Google OAuth (Authentication) only.
// Cloud Storage has been replaced by Cloudinary.
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "freelancer-blog-cac56.firebaseapp.com",
  projectId: "freelancer-blog-cac56",
  messagingSenderId: "455714409999",
  appId: "1:455714409999:web:e9eb131e8bcbe0d57a9d7a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);