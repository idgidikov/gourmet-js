// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsu2lhYQ2dBPyPE6SSqodR3BdFwc1tiYo",
  authDomain: "gourmet-7c0a4.firebaseapp.com",
  projectId: "gourmet-7c0a4",
  storageBucket: "gourmet-7c0a4.appspot.com",
  messagingSenderId: "1042249482251",
  appId: "1:1042249482251:web:4efb5ea99e7c9e26b1870e",
  //Added
  databaseURL: "https://gourmet-7c0a4-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app)

export const storage = getStorage(app)