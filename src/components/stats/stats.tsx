import { FC } from "react";

interface StatsProps {
  totalProducts: number;
  totalUnits: number;
  totalValue: number;
}

const Stats: FC<StatsProps> = ({ totalProducts, totalUnits, totalValue }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mb-6">
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-bold">Total de Productos</h2>
        <p className="text-2xl">{totalProducts}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-bold">Unidades en Inventario</h2>
        <p className="text-2xl">{totalUnits}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-bold">Valor Total</h2>
        <p className="text-2xl">${totalValue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Stats;
