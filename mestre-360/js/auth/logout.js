import { auth } from "../firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.logout = async function () {

    try {
        await signOut(auth);
        window.location.href = "login.html";
    } catch (error) {
        alert("Erro ao sair: " + error.message);
    }

};