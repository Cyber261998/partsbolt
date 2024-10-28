export const generateSignature = async (stringToSign: string, secretKey: string): Promise<string> => {
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