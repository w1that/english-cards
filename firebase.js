import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyClgWCNhe18LpI7oAnYXgBPMmPC7wDh5ok",
    authDomain: "english-cards-2ffce.firebaseapp.com",
    projectId: "english-cards-2ffce",
    storageBucket: "english-cards-2ffce.appspot.com",
    messagingSenderId: "699265554985",
    appId: "1:699265554985:web:87fba30f1fbf0a25c35a38"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


