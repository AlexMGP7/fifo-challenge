import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import Table from '../components/table/table';

const ITEMS_PER_PAGE = 10; // Cantidad de elementos por página

const Dashboard: FC = () => {
  const { movements } = useInventory();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  if (movements === null) {
    return null;
  }

  // Filtrar movimientos según la búsqueda
  const filteredMovements = movements.filter((movement) =>
    movement.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(filteredMovements.length / ITEMS_PER_PAGE);

  // Obtener los movimientos para la página actual
  const paginatedMovements = filteredMovements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Calcular estadísticas
  const totalInventoryUnits = movements.reduce((sum, movement) => sum + movement.inventory.units, 0);
  const totalInventoryValue = movements.reduce((sum, movement) => sum + movement.inventory.total, 0);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
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

      {paginatedMovements.length > 0 ? (
        <>
          <Table movements={paginatedMovements} />

          {/* Controles de Paginación */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <p>
              Página {currentPage} de {totalPages}
            </p>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default Dashboard;
