import { useState, useCallback } from 'react';
import { Product } from '../types';
import { AmazonCrawler } from '../services/amazonCrawler';
import { useProductStore } from '../store/productStore';

export const useCrawler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addProduct } = useProductStore();
  const crawler = new AmazonCrawler();

  const crawlProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const products = await crawler.crawlTopProducts();
      products.forEach(product => addProduct(product));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to crawl products');
    } finally {
      setIsLoading(false);
    }
  }, [addProduct]);

  return { crawlProducts, isLoading, error };
};