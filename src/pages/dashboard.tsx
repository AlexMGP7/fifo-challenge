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

  return (
    <div className="container mx-auto px-4 py-6">
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
