// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-yAdNRndAz1Jqqiw3SGZzat0-1J_RsBw",
  authDomain: "motiva-web-app.firebaseapp.com",
  projectId: "motiva-web-app",
  storageBucket: "motiva-web-app.appspot.com",
  messagingSenderId: "317424975214",
  appId: "1:317424975214:web:924abe86f0d3e9add2157f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);

 
