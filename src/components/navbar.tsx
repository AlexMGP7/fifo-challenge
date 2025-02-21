// src/components/Navbar.tsx

import { ShoppingCart, Search, Menu } from "lucide-react";
import { FC } from "react";



const Navbar: FC = () => {
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
            <ShoppingCart className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
