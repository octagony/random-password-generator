import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnI5lBNnvui_RobZs41NrOJ0fBeTzA5rM",
  authDomain: "easy-pass-40976.firebaseapp.com",
  projectId: "easy-pass-40976",
  storageBucket: "easy-pass-40976.appspot.com",
  messagingSenderId: "459275128220",
  appId: "1:459275128220:web:4e72cce4669f2961f64c59",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
