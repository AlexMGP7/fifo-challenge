import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseConfig";
import { Product, Lote, ExitHistoryRecord } from "../types/inventory";

// 1) Obtener todos los productos de un usuario
export const getProducts = async (): Promise<Product[]> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("No hay un usuario autenticado");

  const productsRef = collection(db, "products");
  const q = query(productsRef, where("ownerId", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// 2) Agregar un producto nuevo
export const addProduct = async (product: Omit<Product, "ownerId">): Promise<string> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("No hay un usuario autenticado");

    const productsRef = collection(db, "products");
    const docRef = await addDoc(productsRef, {
      ...product,
      ownerId: user.uid, // Asociar el producto al usuario actual
    });
    console.log("Producto agregado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw new Error("No se pudo agregar el producto");
  }
};

// 3) Eliminar un producto
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

// 4) Agregar un lote a un producto existente (nueva entrada de stock)
export const addLotToProduct = async (productId: string, newLot: Lote): Promise<void> => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      throw new Error("El producto no existe en la base de datos.");
    }

    const productData = productSnap.data() as Product;
    const currentLots = productData.lots || [];

    const updatedLots = [...currentLots, newLot];

    await updateDoc(productRef, {
      lots: updatedLots,
    });
  } catch (error) {
    console.error("Error al agregar lote:", error);
    throw error;
  }
};

// 5) Registrar salida de forma FIFO
type LoteWithParsedDate = Lote & { parsedDate: Date };

export const updateProductExitFIFO = async (productId: string, unitsToExit: number) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      throw new Error("El producto no existe.");
    }

    const productData = productSnap.data() as Product;
    let lots = productData.lots || [];

    const lotsWithParsedDate: LoteWithParsedDate[] = lots.map((lote) => ({
      ...lote,
      parsedDate: new Date(
        lote.date.split("/").reverse().join("-")
      ),
    }));

    lotsWithParsedDate.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

    let remaining = unitsToExit;
    const exitDetails = [];

    for (let i = 0; i < lotsWithParsedDate.length; i++) {
      if (remaining <= 0) break;

      const lote = lotsWithParsedDate[i];

      if (lote.units > 0) {
        const taken = Math.min(lote.units, remaining);

        exitDetails.push({
          lotId: lote.lotId,
          lotDate: lote.date,
          units: taken,
          pricePerUnit: lote.pricePerUnit,
          total: taken * lote.pricePerUnit,
        });

        lote.units -= taken;
        remaining -= taken;
      }
    }

    if (remaining > 0) {
      throw new Error("No hay suficientes unidades disponibles en el inventario para completar la salida.");
    }

    const updatedLots = lotsWithParsedDate.map(({ parsedDate, ...lote }) => lote);

    await updateDoc(productRef, {
      lots: updatedLots,
    });

    return exitDetails;
  } catch (error) {
    console.error("Error al registrar salida FIFO:", error);
    throw error;
  }
};

// 6) Obtener salidas para el usuario actual
export const getExits = (callback: (exits: ExitHistoryRecord[]) => void) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("No hay un usuario autenticado");

  const exitsRef = collection(db, "exits");
  const q = query(exitsRef, where("ownerId", "==", user.uid));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const exits: ExitHistoryRecord[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ExitHistoryRecord[];
      callback(exits);
    },
    (error) => {
      console.error("Error al obtener las salidas:", error);
    }
  );

  return unsubscribe;
};

// 7) Registrar historial de salida
export const recordExitHistory = async (
  record: Omit<ExitHistoryRecord, "ownerId">
): Promise<void> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("No hay un usuario autenticado");

    const exitsRef = collection(db, "exits");
    await addDoc(exitsRef, {
      ...record,
      ownerId: user.uid, // Asociar la salida al usuario autenticado
    });
  } catch (error) {
    console.error("Error al registrar historial de salida:", error);
    throw new Error("No se pudo registrar el historial de salida.");
  }
};
