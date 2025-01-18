import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import Table from '../components/table/table';

import { useState } from 'react';

const Dashboard: FC = () => {
  const { movements } = useInventory();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  if (movements === null) {
    return null;
  }

  const filteredMovements = movements.filter((movement) =>
    movement.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalInventoryUnits = movements.reduce((sum, movement) => sum + movement.inventory.units, 0);
  const totalInventoryValue = movements.reduce((sum, movement) => sum + movement.inventory.total, 0);


  return (

    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mb-6">
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-bold">Total de Productos</h2>
          <p className="text-2xl">{movements.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-bold">Unidades en Inventario</h2>
          <p className="text-2xl">{totalInventoryUnits}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-bold">Valor Total</h2>
          <p className="text-2xl">${totalInventoryValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <button
          onClick={() => navigate('/add-product')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Producto
        </button>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar producto..."
        className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      />

      {filteredMovements.length > 0 ? (
        <Table movements={filteredMovements} />
      ) : (
        <p className="text-center text-gray-500">No se encontraron resultados.</p>
      )}
    </div>
  );
};


export default Dashboard;
