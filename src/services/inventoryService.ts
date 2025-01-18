import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Movement } from '../types/inventory';

// Obtiene los movimientos del inventario
export const getInventoryMovements = async (): Promise<Movement[]> => {
  const movementsRef = collection(db, 'movements');
  const snapshot = await getDocs(movementsRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Movement[];
};

// Agrega un movimiento al inventario
export const addInventoryMovement = async (movement: Movement): Promise<string> => {
  try {
    const movementsRef = collection(db, 'movements');
    const docRef = await addDoc(movementsRef, movement);
    console.log('Movimiento agregado con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar el movimiento:', error);
    throw new Error('No se pudo agregar el movimiento');
  }
};
