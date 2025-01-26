import { FC, useState, useEffect } from "react";
import { showPrompt, showSuccess, showError, showConfirmation, baseSwal } from "../../utils/swalUtils";
import { deleteProduct, updateProductExitFIFO, recordExitHistory, addLotToProduct } from "../../services/inventoryService";
import { ExitDetail, Product } from "../../types/inventory";
import { query, collection, where, orderBy, limit, onSnapshot,} from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

interface TableRowProps {
  product: Product;
}

const TableRow: FC<TableRowProps> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [lastExitDetails, setLastExitDetails] = useState<ExitDetail[] | null>(null);

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
        sanitizedDetail.lotDate = detail.lotDate;
        sanitizedDetail.units = detail.units;
        sanitizedDetail.pricePerUnit = detail.pricePerUnit;
        sanitizedDetail.total = detail.total;
        return sanitizedDetail;
      });

      const totalValue = sanitizedExitDetails.reduce((sum, detail) => sum + detail.total, 0);
      const now = new Date().toISOString();

      const historyRecord = {
        productId: product.id,
        productName: product.productName,
        date: now,
        units: units,
        exitDetails: sanitizedExitDetails,
        totalValue: totalValue,
      };

      await recordExitHistory(historyRecord);
      showSuccess("Salida registrada exitosamente");
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

  const handleAddLot = async () => {
    if (!product.id) {
      showError("No se puede agregar un lote porque falta el ID del producto.");
      return;
    }
  
    // Obtener la fecha actual en formato DD/MM/YYYY
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;
  
    const { value: formValues } = await baseSwal.fire({
      title: "Agregar Lote",
      html: `
        <input
          id="swal-date"
          class="swal2-input"
          placeholder="Fecha del lote (DD/MM/YYYY)"
          value="${formattedDate}"
        />
        <input
          id="swal-units"
          type="number"
          class="swal2-input"
          placeholder="Cantidad de unidades"
        />
        <input
          id="swal-price"
          type="number"
          class="swal2-input"
          placeholder="Precio por unidad"
        />
      `,
      focusConfirm: false,
      confirmButtonText: "Agregar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const loteDate = (document.getElementById("swal-date") as HTMLInputElement)?.value.trim();
        const loteUnits = (document.getElementById("swal-units") as HTMLInputElement)?.value.trim();
        const lotePrice = (document.getElementById("swal-price") as HTMLInputElement)?.value.trim();
  
        if (!loteDate || !loteUnits || !lotePrice) {
          baseSwal.showValidationMessage("Todos los campos son obligatorios.");
          return;
        }
  
        // Validar formato de fecha DD/MM/YYYY
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(loteDate)) {
          baseSwal.showValidationMessage("La fecha debe estar en formato DD/MM/YYYY.");
          return;
        }
  
        return {
          loteDate,
          loteUnits,
          lotePrice,
        };
      },
    });
  
    if (!formValues) return;
  
    try {
      const newLot = {
        date: formValues.loteDate, // Almacenar en formato DD/MM/YYYY
        units: Number(formValues.loteUnits),
        pricePerUnit: Number(formValues.lotePrice),
      };
  
      await addLotToProduct(product.id, newLot);
      showSuccess("Lote agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar lote:", error);
      showError("No se pudo agregar el lote.");
    }
  };
  

  /**
   * Calcular el total de unidades disponibles sumando todos los lotes
   */
  const getTotalUnits = () => {
    return product.lots.reduce((sum, lote) => sum + lote.units, 0);
  };

  /**
   * useEffect para escuchar la última salida del historial en tiempo real
   */
  useEffect(() => {
    if (!product.id) return;

    const exitsRef = collection(db, "exits");
    const q = query(
      exitsRef,
      where("productId", "==", product.id),
      orderBy("date", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const record = snapshot.docs[0].data() as { exitDetails: ExitDetail[] };
          setLastExitDetails(record.exitDetails || null);
        } else {
          setLastExitDetails(null);
        }
      },
      (error) => {
        console.error("Error al cargar la última salida:", error);
      }
    );

    return () => unsubscribe();
  }, [product.id]);

  

  return (
    <tr className="even:bg-gray-300 odd:bg-white dark:even:bg-gray-900 dark:odd:bg-gray-800">
      <td className="border px-4 py-2">{product.productName}</td>

      <td className="border px-4 py-2">
        {product.lots.length > 0 ? (
          product.lots.map((lote, index) => (
            <div key={index} className="mb-1 border-b border-dashed">
              <p>
                <strong>Lote:</strong> {lote.date}
              </p>
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
              <p>
                <strong>Lote:</strong> {detail.lotDate}
              </p>
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
        <p>
          <strong>Total Unidades:</strong> {getTotalUnits()}
        </p>
      </td>

      <td className="border px-4 py-2 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2">
          {/* Botón Agregar Lote (modal SweetAlert2) */}
          <button
            onClick={handleAddLot}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
          >
            Agregar Lote
          </button>

          {/* Botón Salida FIFO */}
          <button
            onClick={handleExit}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
          >
            {loading ? "Procesando..." : "Registrar Salida"}
          </button>

          {/* Botón Eliminar */}
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
