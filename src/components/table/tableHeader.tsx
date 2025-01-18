import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Producto</th>
        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Fecha</th>
        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Entrada</th>
        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Salida</th>
        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Inventario</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
