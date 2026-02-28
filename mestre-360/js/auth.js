import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// LOGIN
window.login = function () {

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Erro no login: " + error.message);
    });
};


// LOGOUT
window.logout = function () {

  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Erro ao sair: " + error.message);
    });
};