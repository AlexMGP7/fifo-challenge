import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAn9zs-W3wwpKAf_HKrpCaYQIv-iQHW4rs",
  authDomain: "fifo-671b5.firebaseapp.com",
  projectId: "fifo-671b5",
  storageBucket: "fifo-671b5.appspot.com", // Corrige la URL de `storageBucket`
  messagingSenderId: "971573978677",
  appId: "1:971573978677:web:3a7681db6717dcb70cb37c",
  measurementId: "G-8Q4Z85286P",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Authentication
const auth = getAuth(app);

// Inicializa Firestore
const db = getFirestore(app);

export { app, auth, db };
