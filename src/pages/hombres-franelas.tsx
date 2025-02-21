import React from "react";

// This would typically come from your API or database
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

export default function CatalogMenFranelasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nuestra Colección de franelas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clothingItems.map((item) => (
          <a href={`/product/${item.id}`} key={item.id} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={300}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}