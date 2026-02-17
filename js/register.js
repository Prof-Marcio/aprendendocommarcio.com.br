import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btnRegistrar = document.getElementById("btnRegistrar");

btnRegistrar.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        alert("Usuário criado com sucesso!");

        window.location.href = "login.html";

    } catch (error) {
        alert("Erro: " + error.message);
    }

});