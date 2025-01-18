import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from './firebase/firebaseConfig';
import { Movement } from '../types/inventory';

const db = getFirestore(app);

export const getInventoryMovements = async (): Promise<Movement[]> => {
  const movementsRef = collection(db, 'movements');
  const snapshot = await getDocs(movementsRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Movement[];
};
