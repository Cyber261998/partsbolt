import React, { useState } from 'react';
import { useProductStore } from '../store/productStore';
import { ProductForm } from '../components/admin/ProductForm';
import { ProductCrawler } from '../components/admin/ProductCrawler';
import { Product, ProductFormData } from '../types';

export const AdminPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleAddProduct = (data: ProductFormData) => {
    addProduct(data);
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = (data: ProductFormData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="space-x-4">
          <ProductCrawler />
          <button
            onClick={() => setIsAddingProduct(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Product
          </button>
        </div>
      </div>

      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {isAddingProduct ? 'Add Product' : 'Edit Product'}
            </h2>
            <ProductForm
              initialData={editingProduct || undefined}
              onSubmit={isAddingProduct ? handleAddProduct : handleUpdateProduct}
              onCancel={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">${product.price}</p>
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingProduct(product)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}