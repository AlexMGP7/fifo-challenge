// src/components/Navbar.tsx
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { FC, useState } from "react";
import { useCart } from "../context/cartContext";  // Importar el hook del carrito

const Navbar: FC = () => {
  const { cart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4 lg:hidden" />
            <a href="/" className="text-2xl font-bold text-gray-800">
              FashionStore
            </a>
          </div>
          <nav className="hidden lg:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Mujeres
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Hombres
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Search className="h-6 w-6 text-gray-600" />
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative"
              >
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Dropdown del carrito */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Tu Carrito</h3>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {cart.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        No hay productos en el carrito
                      </p>
                    ) : (
                      <>
                        <div className="max-h-96 overflow-y-auto">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between py-2 border-b"
                            >
                              <div className="flex items-center space-x-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    ${item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t mt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Total:</span>
                            <span className="font-semibold">
                              ${calculateTotal()}
                            </span>
                          </div>
                          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                            Finalizar Compra
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;