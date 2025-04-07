import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAUMgUSS2zcy8XPMi1i8Jds-gNkJVDlZvs",
  authDomain: "ruinkeepers-6eab7.firebaseapp.com",
  projectId: "ruinkeepers-6eab7",
  storageBucket: "ruinkeepers-6eab7.firebasestorage.app",
  messagingSenderId: "730038658311",
  appId: "1:730038658311:web:008b3496159d1bccd211a2",
  measurementId: "G-7648VSR3ZX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };