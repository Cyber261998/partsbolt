import React, { useState } from 'react';
import { fetchAmazonProducts } from '../../services/amazon/crawler';
import { useProductStore } from '../../store/productStore';
import { ProductFormData } from '../../types';

export const ProductCrawler: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crawledProducts, setCrawledProducts] = useState<ProductFormData[]>([]);
  const { addProduct, products } = useProductStore();

  const handleCrawl = async () => {
    setLoading(true);
    setError(null);

    try {
      const newProducts = await fetchAmazonProducts();
      const filteredProducts = newProducts.filter(crawledProduct => 
        !products.some(existingProduct => 
          existingProduct.name === crawledProduct.name
        )
      );
      setCrawledProducts(filteredProducts);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (product: ProductFormData) => {
    addProduct(product);
    setCrawledProducts(prevProducts => 
      prevProducts.filter(p => p.name !== product.name)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={handleCrawl}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-200"
        >
          {loading ? 'Crawling...' : 'Crawl Amazon Products'}
        </button>
        {loading && <span className="text-gray-600">Fetching products...</span>}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {crawledProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Crawled Products ({crawledProducts.length})
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {crawledProducts.map((product, index) => (
              <li key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">${product.price}</p>
                    <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddProduct(product)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Add to Store
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};