import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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

// Elimina un movimiento del inventario
export const deleteInventoryMovement = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'movements', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
    throw error;
  }
};

// Actualiza la salida de un movimiento en el inventario
export const updateInventoryExit = async (id: string, unitsToExit: number, currentExitUnits: number, currentInventoryUnits: number): Promise<void> => {
  if (unitsToExit > currentInventoryUnits) {
    throw new Error('La cantidad a retirar excede el inventario disponible.');
  }

  try {
    const docRef = doc(db, 'movements', id);

    // Calcular nuevos valores
    const updatedExit = currentExitUnits + unitsToExit;
    const updatedInventory = currentInventoryUnits - unitsToExit;

    // Actualizar documento en Firebase
    await updateDoc(docRef, {
      "exit.units": updatedExit,
      "inventory.units": updatedInventory,
    });
  } catch (error) {
    console.error('Error al registrar la salida:', error);
    throw error;
  }
};
