export async function fetchWithRetry(
  url: string, 
  options: RequestInit, 
  maxRetries: number = 3, 
  retryDelay: number = 1000
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
        continue;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      lastError = error as Error;
      if (i === maxRetries - 1) break;
      await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
    }
  }
  throw lastError || new Error('Max retries reached');
}