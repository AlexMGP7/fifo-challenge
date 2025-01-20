import { useState, useEffect } from 'react';
import { getProducts } from '../services/inventoryService'; 
import { Product } from '../types/inventory';

export const useInventory = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        // Filtra productos inválidos (sin productName o sin lotes)
        const validProducts = data.filter(
          (product) =>
            product.productName &&
            Array.isArray(product.lots)
        );
        setProducts(validProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchData();
  }, []);

  return { products };
};
