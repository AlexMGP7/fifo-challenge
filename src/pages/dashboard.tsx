import React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Card_product from "../components/card-product/card-product";

// Componente Button animado
const Button = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
    {...props}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  >
    {children}
  </motion.button>
);

function Home() {
  // Animaciones
  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.6 } }
  };

  

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.div
              variants={bannerVariants}
              className="relative w-full h-[400px] overflow-hidden rounded-lg"
            >
              <motion.img
                src="/img/banner.jpg"
                alt="Featured product"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2 }}
              />
              
              <motion.div
                className="absolute inset-0 flex flex-col justify-center items-start p-8 bg-black bg-opacity-40 text-white"
                variants={textVariants}
              >
                <motion.h2 className="text-4xl font-bold mb-4">
                  Colección
                </motion.h2>
                <motion.p className="text-xl mb-6">
                  Descubre muchos más
                </motion.p>
                <Button>Ver más</Button>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Productos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card_product />
          </motion.div>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default Home;