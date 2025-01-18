import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import Table from '../components/table/table';

const Dashboard: FC = () => {
  const { movements } = useInventory();
  const navigate = useNavigate();

  // Mientras movements sea null, no renderiza nada (el padre muestra `Loading`)
  if (movements === null) {
    return null;
  }

  const handleAddProduct = () => {
    navigate('/add-product'); // Navega a la página para agregar productos
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Producto
        </button>
      </div>
      {movements.length > 0 ? (
        <Table movements={movements} />
      ) : (
        <p className="text-center text-gray-500">No hay movimientos registrados.</p>
      )}
    </div>
  );
};

export default Dashboard;
