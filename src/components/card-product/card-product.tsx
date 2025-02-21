// src/components/Navbar.tsx

import { FC } from "react";

function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      {children}
    </button>
  );
}

const Card_product: FC = () => {
  return (
    <div>
      <section>
        <h2 className="text-2xl font-bold mb-6 text-black">Hombres</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">  
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={"/img/pantalones_hombre.jpg"}
                alt={`Product`}
                className="w-full h-64 object-cover md:object-contain"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product Name</h3>
                <p className="text-gray-600 mb-2">$99.99</p>
                <Button className="w-full">Ver más</Button>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={"/img/zapatos_hombre.jpg"}
                alt={`Product`}
                className="w-full h-64 object-cover md:object-contain"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product Name</h3>
                <p className="text-gray-600 mb-2">$99.99</p>
                <Button className="w-full">Ver más</Button>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={"/img/franela_hombre.jpg"}
                alt={`Product`}
                className="w-full h-64 object-cover md:object-contain"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product Name</h3>
                <p className="text-gray-600 mb-2">$99.99</p>
                <Button className="w-full">Ver más</Button>
              </div>
            </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 pt-6 text-black">Mujeres</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div

              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={`/img/pantalones_mujeres.jpg`}
                alt={`Product`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product Name</h3>
                <p className="text-gray-600 mb-2">$99.99</p>
                <Button className="w-full">Ver más</Button>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={`/img/zapatos_mujeres.jpg`}
                alt={`Product`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product Name</h3>
                <p className="text-gray-600 mb-2">$99.99</p>
                <Button className="w-full">Ver más</Button>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={`/img/chinese_girl.jpg`}
                alt={`Product`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product Name</h3>
                <p className="text-gray-600 mb-2">$99.99</p>
                <Button className="w-full">Ver más</Button>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Card_product;
