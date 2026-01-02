import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm-PC64EssDPPAzzB8pvm1XOsYBQLIYic",
  authDomain: "dashboardprojectstore.firebaseapp.com",
  projectId: "dashboardprojectstore",
  storageBucket: "dashboardprojectstore.firebasestorage.app",
  messagingSenderId: "142932084937",
  appId: "1:142932084937:web:137d32d13872784c56e518"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth