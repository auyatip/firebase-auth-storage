import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnIfNeFfoZ2rf1gS07dnC5O8vSvOOeDAA",
  authDomain: "order-714f9.firebaseapp.com",
  projectId: "order-714f9",
  storageBucket: "order-714f9.firebasestorage.app",
  messagingSenderId: "748389711345",
  appId: "1:748389711345:web:e0898d728dd096123b9850",
  measurementId: "G-RS7H2CF12J",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
