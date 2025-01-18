import { FC } from 'react';
import { useInventory } from '../hooks/useInventory';
import Table from '../components/table/table';

const Dashboard: FC = () => {
  const { movements } = useInventory();

  // Mientras movements sea null, no renderiza nada (el padre muestra `Loading`)
  if (movements === null) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>
      {movements.length > 0 ? (
        <Table movements={movements} />
      ) : (
        <p className="text-center text-gray-500">No hay movimientos registrados.</p>
      )}
    </div>
  );
};

export default Dashboard;
