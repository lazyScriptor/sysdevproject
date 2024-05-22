// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLv3yEWwtQ7bV5p0Pv9iRARvPRtJ8lLUk",
  authDomain: "system-development-proje-87917.firebaseapp.com",
  projectId: "system-development-proje-87917",
  storageBucket: "system-development-proje-87917.appspot.com",
  messagingSenderId: "258344155490",
  appId: "1:258344155490:web:e420f385bc487317da943b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);