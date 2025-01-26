import { FC, FormEvent, useState } from 'react';
import { addProduct } from '../../services/inventoryService'; 
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';
import FormField from './formField';
import BackButton from '../backButton';
import { showError, showSuccess } from '../../utils/swalUtils';
import { Product, Lote } from '../../types/inventory';

const ProductForm: FC = () => {
  const [productName, setProductName] = useState('');
  const [entryUnits, setEntryUnits] = useState<number | undefined>(undefined);
  const [entryPrice, setEntryPrice] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validar que los campos necesarios no estén vacíos
    if (!productName || entryUnits === undefined || entryPrice === undefined) {
      showError("Todos los campos son requeridos.");
      return;
    }

    // Crear un lote inicial con la información proporcionada
    const initialLot: Lote = {
      date: formatDate(new Date()),
      units: entryUnits,
      pricePerUnit: entryPrice,
    };

    // Crear el nuevo producto con el lote inicial
    const newProduct: Product = {
      productName,
      lots: [initialLot],
    };

    try {
      await addProduct(newProduct);
      showSuccess("Producto agregado exitosamente");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      showError("Error al agregar el producto. Intenta nuevamente.");
    }
  };

  return (
    <div className="product-form max-w-sm mx-auto">
      <BackButton label="Volver al Inventario" />

      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Agregar Producto</h1>

        <FormField
          id="productName"
          label="Nombre del Producto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nombre del producto"
        />

        <FormField
          id="entryUnits"
          label="Unidades de Entrada"
          value={entryUnits || ''}
          onChange={(e) => setEntryUnits(e.target.value ? parseInt(e.target.value) : undefined)}
          placeholder="Unidades"
          type="number"
        />

        <FormField
          id="entryPrice"
          label="Precio por Unidad (Entrada)"
          value={entryPrice || ''}
          onChange={(e) => setEntryPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
          placeholder="Precio por unidad"
          type="number"
        />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                     focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto 
                     px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                     dark:focus:ring-blue-800"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
