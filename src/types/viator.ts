// Viator API Types
export interface ViatorProduct {
  productCode: string;
  productTitle: string;
  productDescription?: string;
  productUrl?: string;
  images?: ViatorImage[];
  price?: {
    amount: number;
    currency: string;
  };
  rating?: {
    averageRating: number;
    totalReviews: number;
  };
  destination?: {
    destinationId: string;
    destinationName: string;
  };
  duration?: string;
  productOptions?: ViatorProductOption[];
}

export interface ViatorImage {
  variants: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
  alt?: string;
}

export interface ViatorProductOption {
  productOptionCode: string;
  productOptionTitle: string;
  pricing?: {
    amount: number;
    currency: string;
  };
}

export interface ViatorSearchResponse {
  products: ViatorProduct[];
  totalCount: number;
  pagination?: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface ViatorProductDetail extends ViatorProduct {
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  additionalInfo?: string;
  cancellationPolicy?: string;
  groupSize?: string;
  duration?: string;
}

export interface ViatorAvailabilityRequest {
  productCode: string;
  travelDate: string;
  travelCount: number;
}

export interface ViatorAvailabilityResponse {
  available: boolean;
  pricing?: {
    amount: number;
    currency: string;
  };
  timeslots?: Array<{
    startTime: string;
    endTime: string;
  }>;
}
