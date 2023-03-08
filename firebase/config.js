
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCpniSZAi57o36Wb8NTguhiHGNol-UVsfc",
  authDomain: "awesomeproject2-408a5.firebaseapp.com",
  projectId: "awesomeproject2-408a5",
  storageBucket: "awesomeproject2-408a5.appspot.com",
  messagingSenderId: "124260608779",
  appId: "1:124260608779:web:697490688b1aaf2dacd00e"
};

const app=initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {db, auth, storage};