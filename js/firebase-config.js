// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "mestre-360.firebaseapp.com",
  projectId: "mestre-360",
  storageBucket: "mestre-360.firebasestorage.app",
  messagingSenderId: "894952532346",
  appId: "1:894952532346:web:881d00bdc0f6ffd6a38ec3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);