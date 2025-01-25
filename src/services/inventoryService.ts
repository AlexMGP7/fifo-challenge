import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Product, Lote, ExitHistoryRecord } from '../types/inventory';

// 1) Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as Product[];
};

// 2) Agregar un producto nuevo
export const addProduct = async (product: Product): Promise<string> => {
  try {
    const productsRef = collection(db, 'products');
    const docRef = await addDoc(productsRef, product);
    console.log('Producto agregado con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    throw new Error('No se pudo agregar el producto');
  }
};

// 3) Eliminar un producto
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

// 4) Agregar un lote a un producto existente (nueva entrada de stock)
export const addLotToProduct = async (productId: string, newLot: Lote): Promise<void> => {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      throw new Error('El producto no existe en la base de datos.');
    }

    const productData = productSnap.data() as Product;
    const currentLots = productData.lots || [];

    // Podrías generar un lotId si no lo traes del front
    // newLot.lotId = crypto.randomUUID(); // Por ejemplo

    // Agregamos el nuevo lote al array de lotes
    const updatedLots = [...currentLots, newLot];

    await updateDoc(productRef, {
      lots: updatedLots,
    });
  } catch (error) {
    console.error('Error al agregar lote:', error);
    throw error;
  }
};

type LoteWithParsedDate = Lote & { parsedDate: Date };

// 5) Registrar salida de forma FIFO
export const updateProductExitFIFO = async (productId: string, unitsToExit: number) => {
  try {
    // 5.1) Obtenemos el doc del producto
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      throw new Error("El producto no existe.");
    }

    const productData = productSnap.data() as Product;
    let lots = productData.lots || [];

    // 5.2) Convertimos las fechas a formato ISO y añadimos `parsedDate`
    const lotsWithParsedDate: LoteWithParsedDate[] = lots.map((lote) => ({
      ...lote,
      parsedDate: new Date(
        lote.date.split("/").reverse().join("-") // Convertimos DD/MM/YYYY a YYYY-MM-DD
      ),
    }));

    // 5.3) Ordenamos los lotes por fecha ascendente (FIFO)
    lotsWithParsedDate.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

    // 5.4) Recorremos y descontamos
    let remaining = unitsToExit;
    const exitDetails = [];

    for (let i = 0; i < lotsWithParsedDate.length; i++) {
      if (remaining <= 0) break;

      const lote = lotsWithParsedDate[i];

      if (lote.units > 0) {
        // Unidades que podemos sacar de este lote
        const taken = Math.min(lote.units, remaining);

        // Guardamos detalles de la "salida"
        exitDetails.push({
          lotId: lote.lotId,
          lotDate: lote.date, // Mantén el formato original de la fecha
          units: taken,
          pricePerUnit: lote.pricePerUnit,
          total: taken * lote.pricePerUnit,
        });

        // Descontamos en el array
        lote.units -= taken;
        remaining -= taken;
      }
    }

    // 5.5) Validamos si seguimos teniendo pendiente
    if (remaining > 0) {
      throw new Error(
        "No hay suficientes unidades disponibles en el inventario para completar la salida."
      );
    }

    // 5.6) Eliminamos las fechas parseadas antes de actualizar
    const updatedLots = lotsWithParsedDate.map(({ parsedDate, ...lote }) => lote);

    // 5.7) Actualizamos el doc con los lotes actualizados
    await updateDoc(productRef, {
      lots: updatedLots,
    });

    // Retornamos los detalles de la salida
    return exitDetails;
  } catch (error) {
    console.error("Error al registrar salida FIFO:", error);
    throw error;
  }
};


export const recordExitHistory = async (record: ExitHistoryRecord): Promise<void> => {
  try {
    const exitsRef = collection(db, 'exits');
    await addDoc(exitsRef, record);
  } catch (error) {
    console.error('Error al registrar historial de salida:', error);
    throw new Error('No se pudo registrar el historial de salida.');
  }
};