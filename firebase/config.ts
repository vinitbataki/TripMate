import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu4_Fc1XJsQzitL_bBDu3qnWBHaLX5_hw",
  authDomain: "tripmate-1da20.firebaseapp.com",
  projectId: "tripmate-1da20",
  storageBucket: "tripmate-1da20.firebasestorage.app",
  messagingSenderId: "395530789000",
  appId: "1:395530789000:web:cbab5481300cf080bbbf3d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;