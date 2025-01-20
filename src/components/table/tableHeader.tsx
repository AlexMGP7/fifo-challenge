import { FC } from 'react';

const TableHeader: FC = () => {
  return (
    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
      <tr>
        <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Producto</th>
        <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Entradas (Lotes)</th>
        <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Ultima Salida</th>
        <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Inventario Total</th>
        <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Acciones</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
