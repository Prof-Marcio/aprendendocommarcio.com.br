import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ========================= */
/* REGISTRO */
/* ========================= */

window.registrar = async function () {

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Cria documento do usuário no Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      email: email,
      nivel: "aluno", // padrão
      criadoEm: new Date()
    });

    alert("Conta criada com sucesso!");
    window.location.href = "index.html";

  } catch (error) {
    alert("Erro: " + error.message);
  }
};


/* ========================= */
/* LOGIN */
/* ========================= */

window.login = async function () {

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro: " + error.message);
  }
};


/* ========================= */
/* LOGOUT */
/* ========================= */

window.logout = async function () {

  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    alert("Erro ao sair: " + error.message);
  }
};


/* ========================= */
/* PROTEÇÃO AUTOMÁTICA */
/* ========================= */

onAuthStateChanged(auth, (user) => {

  const paginaAtual = window.location.pathname;

  if (!user && !paginaAtual.includes("login.html") && !paginaAtual.includes("registro.html")) {
    window.location.href = "login.html";
  }

  if (user && (paginaAtual.includes("login.html") || paginaAtual.includes("registro.html"))) {
    window.location.href = "index.html";
  }

});