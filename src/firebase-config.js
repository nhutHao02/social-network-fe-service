// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0zGnKc108_w1wF42bx6Bg3-UTcB4C1WQ",
  authDomain: "social-network-re-a9762.firebaseapp.com",
  projectId: "social-network-re-a9762",
  storageBucket: "social-network-re-a9762.firebasestorage.app",
  messagingSenderId: "953109303280",
  appId: "1:953109303280:web:dd35ed5002a1db840dd735"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = firebaseApp.storage;

export { storage, firebaseApp };