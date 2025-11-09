
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyATD3QGG12Dn0EKzPP_asyRfaq2dNlQZAA",
  authDomain: "signment-ten.firebaseapp.com",
  projectId: "signment-ten",
  storageBucket: "signment-ten.firebasestorage.app",
  messagingSenderId: "270881864849",
  appId: "1:270881864849:web:3712988327c115bad35330"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
