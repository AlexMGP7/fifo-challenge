import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const Card_product: FC = () => {
  // Variantes de animación
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const imageHover = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        {/* Sección Hombres */}
        <motion.div>
          <h2 className="text-2xl font-bold mb-6 text-black">Hombres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring" }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <motion.img
                  src={`/img/${
                    ["pantalones_hombre", "zapatos_hombre", "franela_hombre"][
                      index
                    ]
                  }.jpg`}
                  alt="Product"
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {["Pantalones", "Zapatos", "Franelas"][index]}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {index === 2 ? "$99.99" : "Desde $99.99"}
                  </p>
                  <Link
                    to={`/${
                      [
                        "pantalones-hombre",
                        "zapatos-hombre",
                        "franelas-hombre",
                      ][index]
                    }`}
                  >
                    <Button className="w-full">Ver más</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección Mujeres */}
        <motion.div className="pt-6">
          <h2 className="text-2xl font-bold mb-6 text-black">Mujeres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring" }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <motion.img
                  src={`/img/${
                    ["pantalones_mujeres", "zapatos_mujeres", "chinese_girl"][
                      index
                    ]
                  }.jpg`}
                  alt="Product"
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {["Pantalones", "Zapatos", "Franelas"][index]}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {index === 2 ? "$99.99" : "Desde $99.99"}
                  </p>
                  <Link
                    to={`/${
                      [
                        "pantalones-mujeres",
                        "zapatos-mujeres",
                        "franelas-mujeres",
                      ][index]
                    }`}
                  >
                    <Button className="w-full">Ver más</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Card_product;
