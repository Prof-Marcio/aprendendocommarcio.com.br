// ======================================
// SISTEMA COMPLETO DE AUTENTICAÇÃO
// ======================================

import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =============================
// LOGIN
// =============================

window.login = async function () {

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {

    const userCredential = await signInWithEmailAndPassword(auth, email, senha);

    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

    if (userDoc.exists()) {

      const role = userDoc.data().role;

      if (role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "index.html";
      }

    }

  } catch (error) {
    alert("Erro: " + error.message);
  }
};

// =============================
// REGISTRO
// =============================

window.registrar = async function () {

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      role: "aluno"
    });

    alert("Conta criada com sucesso!");
    window.location.href = "index.html";

  } catch (error) {
    alert("Erro: " + error.message);
  }
};

// =============================
// LOGOUT
// =============================

window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};