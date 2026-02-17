import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ===========================
   CONFIG FIREBASE
=========================== */

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "mestre-360.firebaseapp.com",
  projectId: "mestre-360",
  storageBucket: "mestre-360.firebasestorage.app",
  messagingSenderId: "894952532346",
  appId: "1:894952532346:web:881d00bdc0f6ffd6a38ec3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ===========================
   LOGIN
=========================== */

window.login = function () {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Erro: " + error.message);
        });
};

/* ===========================
   LOGOUT
=========================== */

window.logout = function () {

    signOut(auth)
        .then(() => {
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Erro ao sair: " + error.message);
        });
};

/* ===========================
   PROTEÇÃO DE PÁGINA
=========================== */

onAuthStateChanged(auth, (user) => {

    const paginaLogin = window.location.pathname.includes("login.html");

    if (!user && !paginaLogin) {
        window.location.href = "login.html";
    }

});