// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "aqraaz-ab37d.firebaseapp.com",  
  projectId: "aqraaz-ab37d",  
  storageBucket: "aqraaz-ab37d.appspot.com",  
  messagingSenderId: "573174816896",  
  appId: "1:573174816896:web:72d6dd8f34f5859ea2c665",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);