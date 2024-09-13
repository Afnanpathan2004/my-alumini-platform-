// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSxvq0qnzvO7jt0BN-4XcG-LDttoR9mwE",
  authDomain: "alumini-portal--platform.firebaseapp.com",
  projectId: "alumini-portal--platform",
  storageBucket: "alumini-portal--platform.appspot.com",
  messagingSenderId: "522193877933",
  appId: "1:522193877933:web:a0bde5cb8d1237be9d7f24",
  measurementId: "G-MMMW7VZDPE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  // Ensure auth is initialized
const storage = app.storage();
const firestore = app.firestore();
// Export both db and auth
export { db, auth };
