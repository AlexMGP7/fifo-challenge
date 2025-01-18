import { useState, useEffect } from 'react';
import { getInventoryMovements } from '../service/inventoryService';
import { Movement } from '../types/inventory';

export const useInventory = () => {
  const [movements, setMovements] = useState<Movement[]>([]); // Aquí definimos el tipo correcto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInventoryMovements();
        setMovements(data); // Ahora TypeScript no da error
      } catch (error) {
        console.error('Error al cargar los movimientos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { movements, loading };
};
