// ===============================
// AUTH.JS DEFINITIVO
// ===============================

import { auth } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.logout = function () {
    signOut(auth)
        .then(() => {
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Erro ao sair: " + error.message);
        });
};


// ===============================
// LOGIN
// ===============================

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


// ===============================
// LOGOUT
// ===============================

window.logout = function () {

    signOut(auth)
        .then(() => {
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Erro ao sair: " + error.message);
        });
};


// ===============================
// PROTEÇÃO AUTOMÁTICA
// ===============================

onAuthStateChanged(auth, (user) => {

    const pagina = window.location.pathname.split("/").pop();

    // Se não estiver logado e não for login.html → manda para login
    if (!user && pagina !== "login.html") {
        window.location.href = "login.html";
    }

});