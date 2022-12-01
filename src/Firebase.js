// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7t76ULSoQQ-fGUia3IYcOi_x-CoP5uKg",
  authDomain: "creativika.firebaseapp.com",
  projectId: "creativika",
  storageBucket: "creativika.appspot.com",
  messagingSenderId: "950456956267",
  appId: "1:950456956267:web:dc2d49ed75d75e97f7c82e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)