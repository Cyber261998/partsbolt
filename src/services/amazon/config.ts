export const CRAWLER_CONFIG = {
  maxProducts: 10,
  minRating: 4.0,
  minReviews: 50,
  categories: [
    'Brake Parts',
    'Engine Parts',
    'Filters',
    'Suspension',
    'Electrical'
  ]
};

export const API_CONFIG = {
  baseUrl: 'https://www.amazon.sa',
  region: 'sa',
  currency: 'SAR',
  searchPath: '/s',
  department: 'Automotive',
  departmentId: '14650164031'
};