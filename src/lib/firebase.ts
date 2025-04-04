
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWlhrk-ggayb-SNCeIyuENYjurzmrZsz4",
  authDomain: "evephoria-f8209.firebaseapp.com",
  projectId: "evephoria-f8209",
  storageBucket: "evephoria-f8209.firebasestorage.app",
  messagingSenderId: "642781550211",
  appId: "1:642781550211:web:f334f6e1bed1b857952db6",
  measurementId: "G-MG0EX8VNFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
