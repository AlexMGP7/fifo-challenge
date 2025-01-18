import { useState, useEffect } from 'react';
import { getInventoryMovements } from '../service/inventoryService';
import { Movement } from '../types/inventory';

export const useInventory = () => {
  const [movements, setMovements] = useState<Movement[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInventoryMovements();
        // Filtra movimientos inválidos (sin productName o con datos incompletos)
        const validMovements = data.filter(
          (movement) =>
            movement.productName &&
            movement.date &&
            movement.entry?.units !== undefined &&
            movement.inventory?.units !== undefined
        );
        setMovements(validMovements);
      } catch (error) {
        console.error('Error al cargar movimientos:', error);
      }
    };

    fetchData();
  }, []);

  return { movements };
};
