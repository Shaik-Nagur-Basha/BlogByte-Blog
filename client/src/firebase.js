// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "freelancer-blog-cac56.firebaseapp.com",
  projectId: "freelancer-blog-cac56",
  storageBucket: "freelancer-blog-cac56.appspot.com",
  messagingSenderId: "455714409999",
  appId: "1:455714409999:web:e9eb131e8bcbe0d57a9d7a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);