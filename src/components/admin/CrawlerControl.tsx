import React from 'react';
import { useCrawler } from '../../hooks/useCrawler';

export const CrawlerControl: React.FC = () => {
  const { crawlProducts, isLoading, error } = useCrawler();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Amazon Product Crawler</h2>
        <button
          onClick={crawlProducts}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Crawling...' : 'Start Crawler'}
        </button>
      </div>
      
      {error && (
        <div className="text-red-600 text-sm mt-2">
          Error: {error}
        </div>
      )}
      
      <div className="text-sm text-gray-600">
        <p>This crawler will:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Find top 10 selling auto parts</li>
          <li>Filter for products with rising sales</li>
          <li>Apply 15% discount to original prices</li>
          <li>Use non-infringing product images</li>
        </ul>
      </div>
    </div>
  );
};