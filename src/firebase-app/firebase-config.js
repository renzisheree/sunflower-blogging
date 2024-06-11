import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBeU3vOJh2Idskme1N-5XZg42p3PIPPsN0",
  authDomain: "sunflower-bloggi.firebaseapp.com",
  projectId: "sunflower-bloggi",
  storageBucket: "sunflower-bloggi.appspot.com",
  messagingSenderId: "14843032507",
  appId: "1:14843032507:web:2852d405790304f4db4a9e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
