import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/table/table";
import Stats from "../components/stats/stats";
import SearchBar from "../components/searchBar/searchBar";
import PaginationControls from "../components/paginationControls/paginationControls";
import { Product } from "../types/inventory";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../services/firebaseConfig";

const ITEMS_PER_PAGE = 8;

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setError("Usuario no autenticado.");
      setLoading(false);
      return;
    }

    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("ownerId", "==", currentUser.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const updatedProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(updatedProducts);
        setLoading(false); // Detenemos el loading al cargar los productos
      },
      (error: Error) => {
        console.error("Error al obtener productos:", error);
        setError("No se pudieron cargar los productos. Intenta nuevamente.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filtrar productos según la consulta de búsqueda
  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Calcular unidades y valor total del inventario a partir de todos los lotes
  const totalInventoryUnits = products.reduce((sum, product) => {
    const lots = product.lots || []; // Si product.lots es undefined, usar []
    const productUnits = lots.reduce((acc, lote) => acc + (lote.units || 0), 0);
    return sum + productUnits;
  }, 0);

  const totalInventoryValue = products.reduce((sum, product) => {
    const lots = product.lots || []; // Si product.lots es undefined, usar []
    const productValue = lots.reduce(
      (acc, lote) => acc + (lote.units || 0) * (lote.pricePerUnit || 0),
      0
    );
    return sum + productValue;
  }, 0);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {loading ? (
        <p className="text-center text-gray-500">Cargando productos...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <Stats
            totalProducts={products.length}
            totalUnits={totalInventoryUnits}
            totalValue={totalInventoryValue}
          />
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Inventario</h1>
            <button
              onClick={() => navigate("/add-product")}
              className="add-product-button bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            >
              Agregar Producto
            </button>
          </div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {paginatedProducts.length > 0 ? (
            <>
              <Table products={paginatedProducts} />
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className="text-center text-gray-500">No se encontraron resultados.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
