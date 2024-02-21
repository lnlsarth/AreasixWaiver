// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJvZA8_QjVBb4Zwf44ZcQDs2rBUvrcVvo",
  authDomain: "areasixwaiver.firebaseapp.com",
  projectId: "areasixwaiver",
  storageBucket: "areasixwaiver.appspot.com",
  messagingSenderId: "1079194731489",
  appId: "1:1079194731489:web:01b616b1f977a5d0c7c8a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


