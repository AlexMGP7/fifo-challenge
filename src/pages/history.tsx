// src/pages/History.tsx

import { FC, useState, useEffect } from "react";
import { getExits } from "../services/inventoryService";
import SearchBar from "../components/searchBar/searchBar";
import PaginationControls from "../components/paginationControls/paginationControls";
import { ExitHistoryRecord } from "../types/inventory";

const ITEMS_PER_PAGE = 10;

const History: FC = () => {
  const [exitRecords, setExitRecords] = useState<ExitHistoryRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Suscribirse a las salidas en tiempo real
    const unsubscribe = getExits((exits) => {
      setExitRecords(exits);
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Filtrar registros según la consulta de búsqueda (por nombre de producto)
  const filteredRecords = exitRecords.filter((record) =>
    record.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Historial de Salidas</h1>
        {/* Puedes agregar botones adicionales aquí si lo deseas */}
      </div>

      {/* Barra de Búsqueda */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Tabla de Historial */}
      {paginatedRecords.length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <table className="min-w-full border-collapse text-sm">
              {/* Encabezado de la Tabla */}
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Producto</th>
                  <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Fecha</th>
                  <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Unidades</th>
                  <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Valor Total</th>
                  <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Detalles</th>
                </tr>
              </thead>

              {/* Cuerpo de la Tabla */}
              <tbody>
                {paginatedRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="even:bg-gray-300 odd:bg-white dark:even:bg-gray-900 dark:odd:bg-gray-800"
                  >
                    {/* Nombre del Producto */}
                    <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">
                      {record.productName}
                    </td>

                    {/* Fecha de la Salida */}
                    <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">
                      {new Date(record.date).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>

                    {/* Unidades Retiradas */}
                    <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">
                      {record.units}
                    </td>

                    {/* Valor Total de la Salida */}
                    <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">
                      ${record.totalValue.toFixed(2)}
                    </td>

                    {/* Detalles de la Salida */}
                    <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">
                      <details className="whitespace-pre-wrap">
                        <summary className="cursor-pointer text-blue-600 hover:underline">
                          Ver Detalles
                        </summary>
                        {record.exitDetails.map((detail, index) => (
                          <div key={index} className="mt-2">
                            <p>
                              <strong>Lote:</strong> {detail.lotDate}
                            </p>
                            <p>
                              <strong>Unidades:</strong> {detail.units}
                            </p>
                            <p>
                              <strong>Precio/U:</strong> ${detail.pricePerUnit.toFixed(2)}
                            </p>
                            <p>
                              <strong>Total:</strong> ${detail.total.toFixed(2)}
                            </p>
                            {index < record.exitDetails.length - 1 && <hr className="my-1" />}
                          </div>
                        ))}
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de Paginación */}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">No se encontraron registros en el historial.</p>
      )}
    </div>
  );
};

export default History;
