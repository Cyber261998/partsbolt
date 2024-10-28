import React, { useState } from 'react';

interface CrawlerButtonProps {
  onCrawl: () => Promise<void>;
}

export const CrawlerButton: React.FC<CrawlerButtonProps> = ({ onCrawl }) => {
  const [isCrawling, setIsCrawling] = useState(false);

  const handleClick = async () => {
    setIsCrawling(true);
    try {
      await onCrawl();
    } finally {
      setIsCrawling(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isCrawling}
      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400"
    >
      {isCrawling ? 'Crawling...' : 'Start Crawler'}
    </button>
  );
};