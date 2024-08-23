// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjUnzDy629fElMtGZCv8aV8-mhcglPBSI",
  authDomain: "netflixgpt-8596e.firebaseapp.com",
  projectId: "netflixgpt-8596e",
  storageBucket: "netflixgpt-8596e.appspot.com",
  messagingSenderId: "752250768229",
  appId: "1:752250768229:web:d418be3701a0555864af8c",
  measurementId: "G-57YMW0LP6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();