// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-cc1ff.firebaseapp.com",
  projectId: "mern-blog-cc1ff",
  storageBucket: "mern-blog-cc1ff.appspot.com",
  messagingSenderId: "947777356409",
  appId: "1:947777356409:web:48038a8b7afab08eaacaa8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);