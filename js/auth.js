// ==========================================
// AUTH.JS DEFINITIVO
// ==========================================

import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.login = function () {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Erro ao entrar: " + error.message);
        });
};


/* =========================
   LOGOUT
========================= */

window.logout = function () {

    signOut(auth)
        .then(() => {
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Erro ao sair: " + error.message);
        });
};


// ==========================================
// LOGOUT
// ==========================================

function configurarLogout() {

    const btnLogout = document.getElementById("btnLogout");

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            signOut(auth)
                .then(() => {
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    alert("Erro ao sair: " + error.message);
                });
        });
    }
}


// ==========================================
// PROTEÇÃO DE PÁGINA
// ==========================================

onAuthStateChanged(auth, (user) => {

    const paginaLogin = window.location.pathname.includes("login.html");
    const paginaRegistro = window.location.pathname.includes("registro.html");

    if (!user && !paginaLogin && !paginaRegistro) {
        window.location.href = "login.html";
    }

    if (user && paginaLogin) {
        window.location.href = "index.html";
    }

    configurarLogout();
});