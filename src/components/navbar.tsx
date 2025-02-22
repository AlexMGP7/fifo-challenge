import { ShoppingCart, Menu, X, Plus, Minus } from "lucide-react";
import { FC, useState } from "react";
import { useCart } from "../context/cartContext";


const Navbar: FC = () => {
  // En el Navbar component, actualiza la destructuración del useCart:
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      // Transformar el carrito al formato requerido
      const transformedCart = cart.map((item) => ({
        id: item._id, // Usar _id como id
        quantity: item.quantity, // Mantener la cantidad
      }));
  
      console.log("Datos del carrito transformados:", transformedCart);
  
      // Enviar el carrito transformado al backend
      const response = await fetch("http://localhost:3001/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: transformedCart }), // Envía el carrito transformado
      });
  
      if (response.ok) {
        console.log("Compra finalizada y stock actualizado");
        clearCart(); // Limpia el carrito
        setIsCartOpen(false); // Cierra el carrito
      } else {
        console.error("Error al finalizar la compra");
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`); // Muestra un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor"); // Muestra un mensaje de error al usuario
    }
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
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="text-black">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* Añade este botón de eliminación */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              title="Eliminar producto"
                            >
                              <X className="h-5 w-5" />
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
                        {/* Botón de Finalizar Compra */}
                        <button
                          onClick={handleCheckout}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
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
      </header>
    </div>
  );
};
export default Navbar;
