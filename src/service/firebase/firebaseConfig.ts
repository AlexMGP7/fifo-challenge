import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAn9zs-W3wwpKAf_HKrpCaYQIv-iQHW4rs",
  authDomain: "fifo-671b5.firebaseapp.com",
  projectId: "fifo-671b5",
  storageBucket: "fifo-671b5.firebasestorage.app",
  messagingSenderId: "971573978677",
  appId: "1:971573978677:web:3a7681db6717dcb70cb37c",
  measurementId: "G-8Q4Z85286P"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de Firebase Authentication
const auth = getAuth(app);

export { app, auth };