import { Product } from '../types';

// Use Web Crypto API instead of Node's crypto
const generateSignature = async (stringToSign: string, secretKey: string) => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretKey);
  const messageData = encoder.encode(stringToSign);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    messageData
  );
  
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};

export class AmazonCrawler {
  private readonly apiEndpoint = 'https://webservices.amazon.sa/paapi5/searchitems';
  private readonly accessKey: string;
  private readonly secretKey: string;
  private readonly partnerTag: string;

  constructor() {
    this.accessKey = import.meta.env.VITE_AMAZON_ACCESS_KEY || '';
    this.secretKey = import.meta.env.VITE_AMAZON_SECRET_KEY || '';
    this.partnerTag = import.meta.env.VITE_AMAZON_PARTNER_TAG || '';
  }

  private async createRequest(): Promise<RequestInit> {
    const timestamp = new Date().toISOString();
    const stringToSign = `GET\n${this.apiEndpoint}\n${timestamp}`;
    const signature = await generateSignature(stringToSign, this.secretKey);

    return {
      method: 'GET',
      headers: {
        'X-Amz-Date': timestamp,
        'X-Amz-Access-Key': this.accessKey,
        'X-Amz-Partner-Tag': this.partnerTag,
        'Authorization': `AWS4-HMAC-SHA256 Signature=${signature}`,
      },
    };
  }

  async fetchTopProducts(): Promise<Product[]> {
    try {
      const request = await this.createRequest();
      const response = await fetch(`${this.apiEndpoint}?SearchIndex=Automotive&SortBy=Sales`, request);
      
      if (!response.ok) {
        throw new Error(`Amazon API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.transformProducts(data.Items || []);
    } catch (error) {
      console.error('Error fetching Amazon products:', error);
      return [];
    }
  }

  private transformProducts(items: any[]): Product[] {
    return items.slice(0, 10).map(item => ({
      id: item.ASIN,
      name: item.ItemInfo.Title.DisplayValue,
      description: item.ItemInfo.Features?.DisplayValues.join(' ') || '',
      price: this.calculateDiscountedPrice(item.Offers?.Listings[0]?.Price?.Amount),
      image: this.getPlaceholderImage(item.ItemInfo.Title.DisplayValue),
      category: item.ItemInfo.Classifications.Binding.DisplayValue,
      compatibility: [],
      stock: 100
    }));
  }

  private calculateDiscountedPrice(originalPrice: number): number {
    const price = originalPrice || 100;
    return Number((price * 0.85).toFixed(2)); // 15% discount
  }

  private getPlaceholderImage(productName: string): string {
    // Use a placeholder image service with product name as text
    return `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(productName)}`;
  }
}

export const amazonCrawler = new AmazonCrawler();