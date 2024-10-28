import { AmazonProduct } from './types';
import { API_CONFIG } from './config';
import { fetchWithRetry } from './fetcher';

export async function fetchProductsByCategory(category: string): Promise<AmazonProduct[]> {
  const url = new URL(API_CONFIG.baseUrl);
  url.searchParams.append('category', category);
  url.searchParams.append('marketplace', API_CONFIG.region);
  
  try {
    const response = await fetchWithRetry(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    return [];
  }
}