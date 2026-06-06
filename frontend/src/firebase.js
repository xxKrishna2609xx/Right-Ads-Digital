import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0Xb3fyfabSkUV_fjpff7GsrhVXXbwGcA",
  authDomain: "right-ads-website-7afef.firebaseapp.com",
  projectId: "right-ads-website-7afef",
  storageBucket: "right-ads-website-7afef.firebasestorage.app",
  messagingSenderId: "617185732416",
  appId: "1:617185732416:web:f94b9dda948d89af2c7ca5",
  measurementId: "G-1N3VT9B91W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
