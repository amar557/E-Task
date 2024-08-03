import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_KEY,
  authDomain: "hopenotout-4048e.firebaseapp.com",
  projectId: "hopenotout-4048e",
  storageBucket: "hopenotout-4048e.appspot.com",
  messagingSenderId: "940305558131",
  appId: "1:940305558131:web:a20141820ab0b004c8d806",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
