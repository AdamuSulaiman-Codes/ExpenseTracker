// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCinMtCWXBpQT9uu2zO0rQSDIXi5Hz0efM",
  authDomain: "transactions-a34ef.firebaseapp.com",
  projectId: "transactions-a34ef",
  storageBucket: "transactions-a34ef.firebasestorage.app",
  messagingSenderId: "1078953362018",
  appId: "1:1078953362018:web:f865abcb0a08703538c73b",
  measurementId: "G-EN59QYHXP3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
