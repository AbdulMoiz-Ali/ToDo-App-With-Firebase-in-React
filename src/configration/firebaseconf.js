import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAtrAX5VXbSiphOF-q041hXvjzhUKktoKM",
    authDomain: "react-project-all.firebaseapp.com",
    projectId: "react-project-all",
    storageBucket: "react-project-all.appspot.com",
    messagingSenderId: "488767874849",
    appId: "1:488767874849:web:cf02a2efad9befe9554060",
    measurementId: "G-JPJTQCV9SY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);