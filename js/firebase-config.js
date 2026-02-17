// Importações Firebase (versão modular moderna)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// SUA CONFIGURAÇÃO
const firebaseConfig = {
  apiKey: "AIzaSyAn1Eja_qa81xRhzn3lYy_X7t7ML2DKxkg",
  authDomain: "mestre-360.firebaseapp.com",
  projectId: "mestre-360",
  storageBucket: "mestre-360.firebasestorage.app",
  messagingSenderId: "894952532346",
  appId: "1:894952532346:web:881d00bdc0f6ffd6a38ec3"
};

// Inicializa
const app = initializeApp(firebaseConfig);

// Exporta
export const auth = getAuth(app);
export const db = getFirestore(app);