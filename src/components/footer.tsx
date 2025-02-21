import React from "react";
import { motion } from "framer-motion";


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
export default function Footer() {

    
      const staggerVariants = {
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
        visible: { y: 0, opacity: 1 }
      };
  return (
    <div>
        <motion.footer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
          className="bg-gray-800 text-white py-8"
        >
          <div className="container mx-auto px-4">
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Columna 1 */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-400">
                  FashionStore is your one-stop destination for trendy and
                  affordable clothing.
                </p>
              </motion.div>

              {/* Columna 2 */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {['FAQs', 'Shipping', 'Returns', 'Contact Us'].map((link) => (
                    <motion.li
                      key={link}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring" }}
                    >
                      <a href="#" className="text-gray-400 hover:text-white">
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Columna 3 */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Subscribe to get special offers and updates.
                </p>
                <motion.form
                  className="flex"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ type: "spring" }}
                  />
                  <Button
                    type="submit"
                    className="rounded-l-none"
                    initial={{ x: 20 }}
                    whileInView={{ x: 0 }}
                    transition={{ type: "spring", delay: 0.1 }}
                  >
                    Subscribe
                  </Button>
                </motion.form>
              </motion.div>
            </motion.div>
          </div>
        </motion.footer>
    </div>
  );
}