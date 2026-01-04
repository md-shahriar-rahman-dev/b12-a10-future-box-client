import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVDbdIvo_4ryDvjunaI-wgpQYV7meGAss",
  authDomain: "future-box-api-client.firebaseapp.com",
  projectId: "future-box-api-client",
  storageBucket: "future-box-api-client.firebasestorage.app",
  messagingSenderId: "321657359999",
  appId: "1:321657359999:web:dd9279cfc69dd3da58f94a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
