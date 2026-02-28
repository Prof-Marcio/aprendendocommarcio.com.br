import { auth, db } from "../firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const btn = document.getElementById("btnRegistrar");

btn.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // 🔥 Define nível padrão como FREE
        await setDoc(doc(db, "usuarios", user.uid), {
            email: user.email,
            nivel: "free",
            criadoEm: new Date()
        });

        alert("Conta criada com sucesso!");
        window.location.href = "login.html";

    } catch (error) {
        alert("Erro: " + error.message);
    }

});