import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showPrompt, showSuccess, showError, showConfirmation } from "../../utils/swalUtils";
import { deleteProduct, updateProductExitFIFO, recordExitHistory } from "../../services/inventoryService";
import { Product } from "../../types/inventory";
import { 
  query, collection, where, orderBy, limit, getDocs 
} from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

// Definición de la interfaz para los detalles de salida
interface ExitDetail {
  lotId?: string;  
  lotDate: string;
  units: number;
  pricePerUnit: number;
  total: number;
}

interface TableRowProps {
  product: Product;
}

const TableRow: FC<TableRowProps> = ({ product }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lastExitDetails, setLastExitDetails] = useState<ExitDetail[] | null>(null);

  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`, { state: { product } });
  };

  const handleDelete = async () => {
    if (!product.id) {
      showError("No se puede eliminar el producto porque falta el ID.");
      return;
    }

    const confirmed = await showConfirmation(
      "¿Seguro que deseas eliminar este producto?",
      `Producto: "${product.productName}"`
    );

    if (confirmed) {
      try {
        await deleteProduct(product.id);
        showSuccess("Producto eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        showError("No se pudo eliminar el producto.");
      }
    }
  };

  const handleExit = async () => {
    if (!product.id) {
      showError("No se puede registrar salida porque falta el ID del producto.");
      return;
    }
  
    const unitsToExit = await showPrompt(
      "Registrar Salida",
      "Ingresa la cantidad a retirar:"
    );
  
    if (!unitsToExit) {
      showError("Operación cancelada.");
      return;
    }
  
    const units = Number(unitsToExit);
    setLoading(true);
  
    try {
      // 1. Registrar la salida usando la lógica FIFO
      const exitDetails = await updateProductExitFIFO(product.id, units);
      
      // Sanitizar cada detalle para eliminar campos indefinidos
      const sanitizedExitDetails = exitDetails.map(detail => {
        const sanitizedDetail: any = {};
        if (detail.lotId !== undefined) sanitizedDetail.lotId = detail.lotId;
        // Asegurar que los demás campos existen y asignar sus valores
        sanitizedDetail.lotDate = detail.lotDate;
        sanitizedDetail.units = detail.units;
        sanitizedDetail.pricePerUnit = detail.pricePerUnit;
        sanitizedDetail.total = detail.total;
        return sanitizedDetail;
      });
  
      // 2. Calcular el valor total de la salida a partir de los detalles sanitizados
      const totalValue = sanitizedExitDetails.reduce((sum, detail) => sum + detail.total, 0);
      
      // 3. Obtener la fecha y hora actual en formato ISO
      const now = new Date().toISOString();
      
      // 4. Crear el registro de historial con la información necesaria y sanitizada
      const historyRecord = {
        productId: product.id,
        productName: product.productName,
        date: now,
        units: units,
        exitDetails: sanitizedExitDetails,
        totalValue: totalValue,
      };
      
      // 5. Registrar el historial de salida en la base de datos
      await recordExitHistory(historyRecord);
      
      showSuccess("Salida registrada exitosamente");
      console.log("Detalles de salida FIFO:", sanitizedExitDetails);
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message || "No se pudo registrar la salida.");
        console.error("Error detallado:", error);
      } else {
        showError("Se produjo un error inesperado.");
        console.error("Error inesperado:", error);
      }
    } finally {
      setLoading(false);
    }
  };  

  // Función para calcular inventario total sumando unidades de todos los lotes
  const getTotalUnits = () => {
    return product.lots.reduce((sum, lote) => sum + lote.units, 0);
  };

  // useEffect para cargar la última salida del historial para este producto
  useEffect(() => {
    if (!product.id) return;

    const fetchLastExit = async () => {
      try {
        const exitsRef = collection(db, "exits");
        const q = query(
          exitsRef,
          where("productId", "==", product.id),
          orderBy("date", "desc"),
          limit(1)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const record = snapshot.docs[0].data();
          const exitRecord = record as { exitDetails: ExitDetail[] };
          setLastExitDetails(exitRecord.exitDetails || null);
        } else {
          setLastExitDetails(null);
        }
      } catch (error) {
        console.error("Error al cargar la última salida:", error);
      }
    };

    fetchLastExit();
  }, [product.id]);

  return (
    <tr className="even:bg-gray-300 odd:bg-white dark:even:bg-gray-900 dark:odd:bg-gray-800">
      <td className="border px-4 py-2">{product.productName}</td>

      <td className="border px-4 py-2">
        {product.lots.length > 0 ? (
          product.lots.map((lote, index) => (
            <div key={index} className="mb-1 border-b border-dashed">
              <p><strong>Lote:</strong> {lote.date}</p>
              <p>Unidades: {lote.units}</p>
              <p>Precio/U: ${lote.pricePerUnit}</p>
            </div>
          ))
        ) : (
          <p>-</p>
        )}
      </td>

      <td className="border px-4 py-2">
        {lastExitDetails && lastExitDetails.length > 0 ? (
          lastExitDetails.map((detail, index) => (
            <div key={index} className="mb-1 border-b border-dashed">
              <p><strong>Lote:</strong> {detail.lotDate}</p>
              <p>Unidades: {detail.units}</p>
              <p>Precio/U: ${detail.pricePerUnit}</p>
              <p>Total: ${detail.total}</p>
            </div>
          ))
        ) : (
          <p>-</p>
        )}
      </td>

      <td className="border px-4 py-2">
        <p><strong>Total Unidades:</strong> {getTotalUnits()}</p>
      </td>

      <td className="border px-4 py-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          >
            Editar
          </button>
          <button
            onClick={handleExit}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
          >
            {loading ? "Procesando..." : "Salida"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
