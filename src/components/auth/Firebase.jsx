import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "unishare-1a055.firebaseapp.com",
  projectId: "unishare-1a055",
  storageBucket: "unishare-1a055.firebasestorage.app",
  messagingSenderId: "583972069352",
  appId: "1:583972069352:web:6516bd40c77d6c206a8e5d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
