import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showPrompt, showSuccess, showError, showConfirmation } from "../../utils/swalUtils";
import { deleteInventoryMovement, updateInventoryExit } from "../../services/inventoryService";
import { Movement } from "../../types/inventory";

interface TableRowProps {
  movement: Movement;
}

const TableRow: FC<TableRowProps> = ({ movement }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    navigate(`/edit-product/${movement.id}`, { state: { movement } });
  };

  const handleDelete = async () => {
    if (!movement.id) {
      showError("No se puede eliminar el producto porque falta el ID.");
      return;
    }

    const confirmed = await showConfirmation(
      "¿Seguro que deseas eliminar este producto?",
      `Producto: "${movement.productName}"`
    );

    if (confirmed) {
      try {
        await deleteInventoryMovement(movement.id);
        showSuccess("Producto eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        showError("No se pudo eliminar el producto.");
      }
    }
  };

  const handleExit = async () => {
    if (!movement.id) {
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

    if (units > (movement.inventory?.units || 0)) {
      showError("La cantidad a retirar excede el inventario disponible.");
      return;
    }

    setLoading(true);

    try {
      await updateInventoryExit(
        movement.id,
        units,
        movement.exit?.units || 0,
        movement.inventory?.units || 0
      );
      showSuccess("Salida registrada exitosamente");
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message || "No se pudo registrar la salida.");
      } else {
        showError("Se produjo un error inesperado.");
      }
      console.error("Error al registrar salida:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="even:bg-gray-300 odd:bg-white dark:even:bg-gray-900 dark:odd:bg-gray-800">
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">{movement.productName}</td>
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">{movement.date}</td>
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">
        {movement.entry ? (
          <>
            <p>Unidades: {movement.entry.units || "-"}</p>
            <p>Precio/U: ${movement.entry.pricePerUnit || "-"}</p>
            <p>Importe: ${movement.entry.total || "-"}</p>
          </>
        ) : (
          <p>-</p>
        )}
      </td>
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">
        {movement.exit ? (
          <>
            <p>Unidades: {movement.exit.units || "-"}</p>
            <p>Precio/U: ${movement.exit.pricePerUnit || "-"}</p>
            <p>Importe: ${movement.exit.total || "-"}</p>
          </>
        ) : (
          <p>-</p>
        )}
      </td>
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">
        <p>Unidades: {movement.inventory?.units || "-"}</p>
        <p>Precio/U: ${movement.inventory?.pricePerUnit || "-"}</p>
        <p>Importe: ${movement.inventory?.total || "-"}</p>
      </td>
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2 align-middle">
        <div className="flex items-center justify-center h-full space-x-2">
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
