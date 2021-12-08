import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDKA2ukqQDl4OxJCUL8ZjdPbKSPs-TvRH8",
    authDomain: "car-book-d6902.firebaseapp.com",
    projectId: "car-book-d6902",
    storageBucket: "car-book-d6902.appspot.com",
    messagingSenderId: "963236722930",
    appId: "1:963236722930:web:0df4af2fc4ae388e56786b",
    measurementId: "${config.measurementId}",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
