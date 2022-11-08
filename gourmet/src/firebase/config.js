// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD96vjt2W4_zoypgoT3gaEbDb8dv6DA6CY",
  authDomain: "gourmet-d8238.firebaseapp.com",
  projectId: "gourmet-d8238",
  storageBucket: "gourmet-d8238.appspot.com",
  messagingSenderId: "792116827858",
  appId: "1:792116827858:web:16793b0665c10ceebb3f0b",

  databaseURL: "https://gourmet-d8238-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app)

export const storage = getStorage(app)