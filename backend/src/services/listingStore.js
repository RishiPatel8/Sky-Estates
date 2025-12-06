"use strict";

const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const DATA_PATH = path.join(__dirname, "..", "..", "data", "listings.json");

let listingsCache = [];
let lastLoaded = null;

const loadListings = async () => {
  if (listingsCache.length && lastLoaded) {
    return listingsCache;
  }
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  listingsCache = JSON.parse(raw);
  lastLoaded = new Date();
  return listingsCache;
};

const persistListings = async () => {
  await fs.writeFile(DATA_PATH, JSON.stringify(listingsCache, null, 2), "utf-8");
};

const getListings = async (filters = {}) => {
  const data = await loadListings();
  return data.filter((listing) => {
    if (filters.mode && listing.mode !== filters.mode) {
      return false;
    }
    if (
      filters.city &&
      listing.location?.city?.toLowerCase() !== filters.city.toLowerCase()
    ) {
      return false;
    }
    if (filters.search) {
      const haystack = `${listing.title} ${listing.description} ${listing.location.city}`.toLowerCase();
      if (!haystack.includes(filters.search.toLowerCase())) {
        return false;
      }
    }
    if (filters.propertyType && listing.category !== filters.propertyType) {
      return false;
    }
    if (filters.bhk) {
      const beds = Number(listing.beds || 0);
      if (filters.bhk === "1bhk" && beds !== 1) {
        return false;
      }
      if (filters.bhk === "2bhk" && beds !== 2) {
        return false;
      }
      if (filters.bhk === "3plus" && beds < 3) {
        return false;
      }
    }
    return true;
  });
};

const addListing = async (payload) => {
  const newListing = {
    ...payload,
    id: payload.id || uuid(),
    createdAt: new Date().toISOString(),
    ownerId: payload.ownerId || payload.userId || null,
    heroImage: payload.heroImage || "/images/properties/custom-listing.jpg",
    gallery: payload.gallery || [],
    tags: payload.tags || [],
    amenities: payload.amenities || [],
  };

  const existing = await loadListings();
  listingsCache = [newListing, ...existing];
  await persistListings();
  return newListing;
};

const updateListing = async (id, changes, userId) => {
  const data = await loadListings();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Listing not found");
  }
  const existing = data[index];
  if (userId && existing.ownerId && existing.ownerId !== userId) {
    throw new Error("You are not allowed to edit this listing");
  }

  const updated = { ...existing, ...changes };
  listingsCache[index] = updated;
  await persistListings();
  return updated;
};

const removeListing = async (id, userId) => {
  const data = await loadListings();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Listing not found");
  }
  const existing = data[index];
  if (userId && existing.ownerId && existing.ownerId !== userId) {
    throw new Error("You are not allowed to delete this listing");
  }

  listingsCache = [...data.slice(0, index), ...data.slice(index + 1)];
  await persistListings();
};

const getStats = async () => {
  const data = await loadListings();
  const stats = data.reduce(
    (acc, listing) => {
      acc.total += 1;
      acc.modes[listing.mode] = (acc.modes[listing.mode] || 0) + 1;
      acc.cities[listing.location.city] =
        (acc.cities[listing.location.city] || 0) + 1;
      acc.avgTicket += listing.price;
      return acc;
    },
    { total: 0, modes: {}, cities: {}, avgTicket: 0 }
  );

  stats.avgTicket = stats.total ? Math.round(stats.avgTicket / stats.total) : 0;
  stats.topCity = Object.entries(stats.cities).sort((a, b) => b[1] - a[1])[0]?.[0];
  return stats;
};

module.exports = {
  getListings,
  addListing,
  updateListing,
  removeListing,
  getStats,
};
