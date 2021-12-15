import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKA2ukqQDl4OxJCUL8ZjdPbKSPs-TvRH8",
    authDomain: "car-book-d6902.firebaseapp.com",
    databaseURL: "https://car-book-d6902-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "car-book-d6902",
    storageBucket: "car-book-d6902.appspot.com",
    messagingSenderId: "963236722930",
    appId: "1:963236722930:web:0df4af2fc4ae388e56786b",
    measurementId: "G-HMKVVB4QRK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
