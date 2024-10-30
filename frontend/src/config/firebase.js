import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFSOFLix3nEaRNK-imTYsWB_ZYiLooR2U",
  authDomain: "fir-react-learning-b6271.firebaseapp.com",
  projectId: "fir-react-learning-b6271",
  storageBucket: "fir-react-learning-b6271.appspot.com",
  messagingSenderId: "836496547625",
  appId: "1:836496547625:web:1416de7f313d3c14992138",
  measurementId: "G-ZLBQ0FN8Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
