import React from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export const ProductPage: React.FC = () => {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  // In a real app, fetch product details based on id
  const product = {
    id: '1',
    name: 'Brake Pad Set',
    description: 'High-performance ceramic brake pads for optimal stopping power',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3',
    category: 'Brakes',
    compatibility: ['Toyota', 'Honda', 'Ford'],
    stock: 50
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Compatible with:</h3>
              <ul className="mt-2 list-disc list-inside">
                {product.compatibility.map((car) => (
                  <li key={car}>{car}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => addItem(product)}
              className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};