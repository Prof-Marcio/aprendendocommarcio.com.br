import { auth } from "./firebase-config.js";
import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    // Se NÃO estiver logado → manda para login
    if (!user) {
        window.location.href = "login.html";
    }

});