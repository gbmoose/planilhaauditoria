// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBuxON29_4SS7LFw-mzW4YXUVEuti-FWZs",
  authDomain: "planilhadeauditoria.firebaseapp.com",
  projectId: "planilhadeauditoria",
  storageBucket: "planilhadeauditoria.firebasestorage.app",
  messagingSenderId: "987346699768",
  appId: "1:987346699768:web:bac61909a45f732dc9c20d",
  measurementId: "G-2PS83QEPMS"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);


// Serviços que você vai usar
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInAnonymously };
