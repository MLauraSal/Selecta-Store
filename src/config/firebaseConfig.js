// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyCr-dQ3gEkfdT58Aa0ZIR3hzHqV4EfB3KY",
  authDomain: "selectastore-ecommers.firebaseapp.com",
  projectId: "selectastore-ecommers",
  storageBucket: "selectastore-ecommers.firebasestorage.app",
  messagingSenderId: "914883241247",
  appId: "1:914883241247:web:afa1b0a65886197a973c2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);