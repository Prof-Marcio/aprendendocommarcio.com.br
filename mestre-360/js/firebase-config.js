// ================================
// FIREBASE CONFIG DEFINITIVO
// ================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// SUA CONFIGURAÇÃO
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "mestre-360.firebaseapp.com",
  projectId: "mestre-360",
  storageBucket: "mestre-360.appspot.com",
  messagingSenderId: "894952532346",
  appId: "1:894952532346:web:XXXXXXX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);