import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBn8hG0mR45V-TPuaeEgzOkc2tNHv6ePEE",
  authDomain: "teste2-23429.firebaseapp.com",
  projectId: "teste2-23429",
  storageBucket: "teste2-23429.appspot.com",
  messagingSenderId: "512065819486",
  appId: "1:512065819486:web:1f60bcaa349ffc09d675cf",
  measurementId: "G-FR44Q0DR10"
};
    
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
