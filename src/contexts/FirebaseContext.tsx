// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQrePNI55q2Up-2peTsdHvOo0cuHdV0WI",
  authDomain: "silentsos-d6e21.firebaseapp.com",
  projectId: "silentsos-d6e21",
  storageBucket: "silentsos-d6e21.firebasestorage.app",
  messagingSenderId: "71071098405",
  appId: "1:71071098405:web:900753c3e85467d397c1cc",
  measurementId: "G-P0N1T1WMCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };