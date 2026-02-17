// Importações Firebase (versão modular moderna)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Configuração do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyAn1Eja_qa81xRhzn3lYy_X7t7ML2DKxkg",
  authDomain: "mestre-360.firebaseapp.com",
  databaseURL: "https://mestre-360-default-rtdb.firebaseio.com",
  projectId: "mestre-360",
  storageBucket: "mestre-360.firebasestorage.app",
  messagingSenderId: "894952532346",
  appId: "1:894952532346:web:881d00bdc0f6ffd6a38ec3",
  measurementId: "G-91LYEJ427C"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta autenticação
export const auth = getAuth(app);