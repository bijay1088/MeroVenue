// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrSKj0NTu86JYOs7LZLWw8CTY8uciaayI",
    authDomain: "mero-venue.firebaseapp.com",
    projectId: "mero-venue",
    storageBucket: "mero-venue.appspot.com",
    messagingSenderId: "320779879238",
    appId: "1:320779879238:web:ab509b253704782723db47",
    measurementId: "G-6J6JB040MB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;