import { FC } from 'react';
import { Movement } from '../../types/inventory';
import { useNavigate } from 'react-router-dom';
import { deleteInventoryMovement } from '../../services/inventoryService';
import { showConfirmation, showSuccess, showError } from "../../utils/swalUtils";

interface TableRowProps {
  movement: Movement;
}

const TableRow: FC<TableRowProps> = ({ movement }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit-product/${movement.id}`, { state: { movement } });
  };

  const handleDelete = async () => {

    if (!movement.id) {
      console.error("Error: El ID del producto es indefinido.");
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
  return (
    <tr className="even:bg-gray-300 odd:bg-white dark:even:bg-gray-900 dark:odd:bg-gray-800">
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">{movement.productName}</td>
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">{movement.date}</td>
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">
        {movement.entry ? (
          <>
            <p>Unidades: {movement.entry?.units || '-'}</p>
            <p>Precio/U: ${movement.entry?.pricePerUnit || '-'}</p>
            <p>Importe: ${movement.entry?.total || '-'}</p>
          </>
        ) : (
          <p>-</p>
        )}
      </td>
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">
        {movement.exit ? (
          <>
            <p>Unidades: {movement.exit?.units || '-'}</p>
            <p>Precio/U: ${movement.exit?.pricePerUnit || '-'}</p>
            <p>Importe: ${movement.exit?.total || '-'}</p>
          </>
        ) : (
          <p>-</p>
        )}
      </td>
      <td className="border border-gray-400 dark:border-gray-700 px-4 py-2">
        <p>Unidades: {movement.inventory?.units || '-'}</p>
        <p>Precio/U: ${movement.inventory?.pricePerUnit || '-'}</p>
        <p>Importe: ${movement.inventory?.total || '-'}</p>
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
