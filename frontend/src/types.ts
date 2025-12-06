export type ListingMode = "buy" | "sell" | "rent";

export interface ListingLocation {
  city: string;
  state?: string;
  neighborhood: string;
  addressLine?: string;
  pincode?: string;
  geo?: [number, number];
}

export interface Listing {
  id: string;
  mode: ListingMode;
  category: string;
  title: string;
  developer: string;
  location: ListingLocation;
  price: number;
  currency: string;
  beds: number;
  baths: number;
  areaSqFt: number;
  yearBuilt: number;
  status: string;
  tags: string[];
  amenities: string[];
  heroImage: string;
  gallery: string[];
  description: string;
  yield: number;
  createdAt?: string;
}

export type ListingSort = "relevance" | "priceAsc" | "priceDesc" | "newest";

export interface ApiListResponse {
  ok: boolean;
  count: number;
  listings: Listing[];
}

export interface ApiCreateResponse {
  ok: boolean;
  listing: Listing;
}

