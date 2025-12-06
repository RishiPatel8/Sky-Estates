import useSWR from "swr";
import { api } from "../api/client";
import type { ApiListResponse, Listing, ListingMode } from "../types";

const fetcher = (url: string) => api.get<ApiListResponse>(url).then((res) => res.data);

export interface ListingFilters {
  mode?: ListingMode;
  search?: string;
  city?: string;
  propertyType?: string;
  bhk?: string;
}

export const useListings = (filters: ListingFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.mode) params.append("mode", filters.mode);
  if (filters.search) params.append("search", filters.search);
  if (filters.city) params.append("city", filters.city);
  if (filters.propertyType) params.append("propertyType", filters.propertyType);
  if (filters.bhk) params.append("bhk", filters.bhk);
  const query = params.toString();
  const key = `/listings${query ? `?${query}` : ""}`;

  const { data, error, isValidating, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    listings: data?.listings ?? [],
    count: data?.count ?? 0,
    loading: !data && !error,
    error,
    isValidating,
    mutate,
  };
};

export const useFeatureBuckets = () => {
  const { listings, loading, error } = useListings();
  return {
    hero: listings.slice(0, 3),
    buy: listings.filter((item) => item.mode === "buy").slice(0, 4),
    rent: listings.filter((item) => item.mode === "rent").slice(0, 4),
    sell: listings.filter((item) => item.mode === "sell").slice(0, 4),
    loading,
    error,
  };
};

export const formatListingPrice = (listing: Listing) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(listing.price);
};

