import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import Table from "../components/table/table";
import Stats from "../components/stats/stats";
import SearchBar from "../components/searchBar/searchBar";
import PaginationControls from "../components/paginationControls/paginationControls";
import { Movement } from "../types/inventory";

const ITEMS_PER_PAGE = 8;

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const db = getFirestore();
    const movementsCollection = collection(db, "movements");

    const unsubscribe = onSnapshot(movementsCollection, (snapshot) => {
      const updatedMovements = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Movement[];
      setMovements(updatedMovements);
    });

    return () => unsubscribe();
  }, []);

  const filteredMovements = movements.filter((movement) =>
    movement.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMovements.length / ITEMS_PER_PAGE);

  const paginatedMovements = filteredMovements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalInventoryUnits = movements.reduce(
    (sum, movement) => sum + movement.inventory.units,
    0
  );

  const totalInventoryValue = movements.reduce(
    (sum, movement) => sum + movement.inventory.total,
    0
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Stats
        totalProducts={movements.length}
        totalUnits={totalInventoryUnits}
        totalValue={totalInventoryValue}
      />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Producto
        </button>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {paginatedMovements.length > 0 ? (
        <>
          <Table movements={paginatedMovements} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default Dashboard;
