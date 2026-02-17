import { auth, db } from "../firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function verificarNivel() {

    const user = auth.currentUser;

    if (!user) return null;

    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().nivel;
    }

    return null;
}