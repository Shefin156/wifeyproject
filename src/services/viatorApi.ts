import axios from 'axios';
import type {
  ViatorProduct,
  ViatorSearchResponse,
  ViatorProductDetail,
  ViatorAvailabilityRequest,
  ViatorAvailabilityResponse,
} from '../types/viator';

// Viator API Base URL
const VIATOR_API_BASE_URL = import.meta.env.VITE_VIATOR_API_URL || 'https://api.viator.com/partner/v2';
const VIATOR_API_KEY = import.meta.env.VITE_VIATOR_API_KEY || '';

// Create axios instance with default config
const viatorApi = axios.create({
  baseURL: VIATOR_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'exp-api-key': VIATOR_API_KEY,
  },
});

// Helper function to transform Viator API response to our format
function transformProduct(product: any): ViatorProduct {
  return {
    productCode: product.productCode || product.code || '',
    productTitle: product.productTitle || product.title || '',
    productDescription: product.productDescription || product.description || '',
    productUrl: product.productUrl || product.url || '',
    images: product.images || product.media?.images || [],
    price: product.price || {
      amount: product.pricing?.amount || 0,
      currency: product.pricing?.currency || 'USD',
    },
    rating: product.rating || {
      averageRating: product.reviews?.averageRating || 0,
      totalReviews: product.reviews?.totalReviews || 0,
    },
    destination: product.destination || {
      destinationId: product.destinationId || '',
      destinationName: product.destinationName || product.location || '',
    },
    duration: product.duration || product.durationInMinutes || '',
    productOptions: product.productOptions || [],
  };
}

// Search products
export async function searchProducts(params: {
  searchQuery?: string;
  destination?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}): Promise<ViatorSearchResponse> {
  try {
    const queryParams: Record<string, string> = {};
    
    if (params.searchQuery) {
      queryParams.searchQuery = params.searchQuery;
    }
    if (params.destination) {
      queryParams.destination = params.destination;
    }
    if (params.category) {
      queryParams.category = params.category;
    }
    if (params.page) {
      queryParams.page = params.page.toString();
    }
    if (params.pageSize) {
      queryParams.pageSize = params.pageSize.toString();
    }

    const response = await viatorApi.get('/products', {
      params: queryParams,
    });

    const products = Array.isArray(response.data.products)
      ? response.data.products.map(transformProduct)
      : Array.isArray(response.data)
      ? response.data.map(transformProduct)
      : [];

    return {
      products,
      totalCount: response.data.totalCount || products.length,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error('Error searching products:', error);
    // Return empty results on error (fallback to mock data)
    return {
      products: [],
      totalCount: 0,
    };
  }
}

// Get product details
export async function getProductDetails(productCode: string): Promise<ViatorProductDetail | null> {
  try {
    const response = await viatorApi.get(`/products/${productCode}`);

    const product = transformProduct(response.data);

    return {
      ...product,
      highlights: response.data.highlights || [],
      inclusions: response.data.inclusions || [],
      exclusions: response.data.exclusions || [],
      additionalInfo: response.data.additionalInfo || '',
      cancellationPolicy: response.data.cancellationPolicy || '',
      groupSize: response.data.groupSize || '',
      duration: response.data.duration || '',
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

// Check availability
export async function checkAvailability(
  request: ViatorAvailabilityRequest
): Promise<ViatorAvailabilityResponse> {
  try {
    const response = await viatorApi.post('/availability', request);
    return {
      available: response.data.available || false,
      pricing: response.data.pricing,
      timeslots: response.data.timeslots || [],
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    return {
      available: false,
    };
  }
}

// Get popular products (for homepage)
export async function getPopularProducts(limit: number = 6): Promise<ViatorProduct[]> {
  try {
    const response = await searchProducts({
      pageSize: limit,
      page: 1,
    });
    return response.products;
  } catch (error) {
    console.error('Error fetching popular products:', error);
    return [];
  }
}
