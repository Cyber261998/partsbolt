export async function generateSignature(timestamp: string, apiKey: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(timestamp + apiKey);
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createHeaders(apiKey: string): Promise<HeadersInit> {
  const timestamp = new Date().toISOString();
  const signature = await generateSignature(timestamp, apiKey);

  return {
    'Authorization': `Bearer ${apiKey}`,
    'X-Timestamp': timestamp,
    'X-Signature': signature,
    'Content-Type': 'application/json'
  };
}