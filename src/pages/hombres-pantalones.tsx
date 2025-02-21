import React from "react";
import { motion } from "framer-motion";

const clothingItems = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 19.99,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "Leather Jacket",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    name: "Striped Polo Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    name: "High-Waisted Shorts",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=300",
  },
];

export default function CatalogMenPantalonesPage() {
  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const imageVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        Nuestra Colección de pantalones
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {clothingItems.map((item) => (
          <motion.a
            href={`/product/${item.id}`}
            key={item.id}
            className="group"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
              whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
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
                  className="text-lg font-semibold mb-2 transition-colors duration-300"
                  whileHover={{ color: "#3B82F6" }} // Color primary
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
              </motion.div>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}