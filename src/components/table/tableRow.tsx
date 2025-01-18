import React from 'react';
import { Movement } from '../../types/inventory';

interface TableRowProps {
  movement: Movement;
}

const TableRow: React.FC<TableRowProps> = ({ movement }) => {
  return (
    <tr className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800">
      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{movement.productName}</td>
      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{movement.date}</td>
      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
        {movement.entry ? (
          <>
            <p>Unidades: {movement.entry?.units || '-'}</p>
            <p>Precio/U: {movement.entry?.pricePerUnit || '-'}</p>
            <p>Importe: {movement.entry?.total || '-'}</p>
          </>
        ) : (
          <p>-</p>
        )}
      </td>
      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
        {movement.exit ? (
          <>
            <p>Unidades: {movement.exit?.units || '-'}</p>
            <p>Precio/U: {movement.exit?.pricePerUnit || '-'}</p>
            <p>Importe: {movement.exit?.total || '-'}</p>
          </>
        ) : (
          <p>-</p>
        )}
      </td>
      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
        <p>Unidades: {movement.inventory?.units || '-'}</p>
        <p>Precio/U: {movement.inventory?.pricePerUnit || '-'}</p>
        <p>Importe: {movement.inventory?.total || '-'}</p>
      </td>
    </tr>
  );
};

export default TableRow;
