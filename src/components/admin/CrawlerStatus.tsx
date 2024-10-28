import React from 'react';

interface CrawlerStatusProps {
  isCrawling: boolean;
  productCount: number;
  onCrawl: () => void;
}

export const CrawlerStatus: React.FC<CrawlerStatusProps> = ({
  isCrawling,
  productCount,
  onCrawl
}) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onCrawl}
        disabled={isCrawling}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isCrawling ? 'Crawling...' : 'Crawl Amazon Products'}
      </button>
      {productCount > 0 && (
        <span className="text-sm text-gray-600">
          {productCount} products found
        </span>
      )}
    </div>
  );
}