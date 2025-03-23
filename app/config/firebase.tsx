
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-resume-builder-a7237.firebaseapp.com",
  projectId: "ai-resume-builder-a7237",
  storageBucket: "ai-resume-builder-a7237.firebasestorage.app",
  messagingSenderId: "377763438850",
  appId: "1:377763438850:web:c13ab8daef28544bb0a21b",
  measurementId: "G-5C0K1963M6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
