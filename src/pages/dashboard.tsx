import React from "react";
import Card_product from "../components/card-product/card-product";


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

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="relative">
            <img
              src="https://via.placeholder.com/1200x400"
              alt="Featured product"
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 bg-black bg-opacity-40 text-white rounded-lg">
              <h2 className="text-4xl font-bold mb-4">Colección</h2>
              <p className="text-xl mb-6">Descubre muchos más</p>
              <Button>Ver más</Button>
            </div>
          </div>
        </section>

        <div>
          <Card_product />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                FashionStore is your one-stop destination for trendy and affordable clothing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button type="submit" className="rounded-l-none">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
