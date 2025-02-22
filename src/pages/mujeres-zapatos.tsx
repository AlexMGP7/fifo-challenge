import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/cartContext";
import { ShoppingCart } from "lucide-react";

export default function CatalogWomenZapatosPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado añadido
  const [error, setError] = useState<string | null>(null); // Estado añadido
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/products/woman-zapatos"
        );
        if (!response.ok) throw new Error("Error en la solicitud");
        const data = await response.json();
        console.log("Data", response);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Muestra estados de carga/error
  if (loading)
    return <div className="text-center py-8">Cargando productos...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const imageVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-3xl font-bold mb-6 text-black"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          Nuestra Colección de zapatos
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {products.map((item) => (
            <motion.a
              href={`/product/${item._id}`}
              key={item._id}
              className="group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden relative"
                whileHover={{
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <motion.img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover"
                  variants={imageVariants}
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="p-4"
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  <motion.h2
                    className="text-lg text-black font-semibold mb-2 transition-colors duration-300"
                    whileHover={{ color: "#3B82F6" }}
                  >
                    {item.name}
                  </motion.h2>
                  <motion.p
                    className="text-gray-600"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                  >
                    ${item.price.toFixed(2)}
                  </motion.p>
                  <motion.button
                    className="absolute top-2 right-2 p-2 rounded-full bg-blue-500 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    type="button"
                  >
                    <ShoppingCart className="h-6 w-6" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
