// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  //........................build>>authentication>>web>>get Started
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Qm7wViRyJhzdfe1-BIQpKEIThRe6vac",
  authDomain: "fir-login-registration-d46c9.firebaseapp.com",
  projectId: "fir-login-registration-d46c9",
  storageBucket: "fir-login-registration-d46c9.firebasestorage.app",
  messagingSenderId: "447070688901",
  appId: "1:447070688901:web:3046a79ec545b5fb183bec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
