// Environment variables helper
export const env = {
  viatorApiUrl: import.meta.env.VITE_VIATOR_API_URL || 'https://api.viator.com/partner/v2',
  viatorApiKey: import.meta.env.VITE_VIATOR_API_KEY || '',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Check if API key is configured
export const isViatorApiConfigured = () => {
  return !!env.viatorApiKey;
};
