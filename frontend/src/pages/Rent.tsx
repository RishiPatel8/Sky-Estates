import { useEffect, useMemo, useState } from "react";
import { useListings } from "../hooks/useListings";
import { ListingCard } from "../components/ListingCard";
import { FiltersBar } from "../components/FiltersBar";
import type { Listing, ListingSort } from "../types";

const sortListings = (listings: Listing[], sort: ListingSort) => {
  if (sort === "priceAsc") {
    return [...listings].sort((a, b) => a.price - b.price);
  }
  if (sort === "priceDesc") {
    return [...listings].sort((a, b) => b.price - a.price);
  }
  if (sort === "newest") {
    return [...listings].sort((a, b) => (b.yearBuilt ?? 0) - (a.yearBuilt ?? 0));
  }
  return listings;
};

export const Rent = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [sort, setSort] = useState<ListingSort>("relevance");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState("all");
  const [bhk, setBhk] = useState("all");

  const { listings, loading, error } = useListings({
    mode: "rent",
    search: search.trim() || undefined,
    city: city === "all" ? undefined : city,
    propertyType: propertyType === "all" ? undefined : propertyType,
    bhk: bhk === "all" ? undefined : bhk,
  });

  useEffect(() => {
    setCityOptions((prev) => {
      const next = new Set([...prev, ...listings.map((listing) => listing.location.city)]);
      return Array.from(next).sort();
    });
  }, [listings]);

  const sortedListings = useMemo(() => sortListings(listings, sort), [listings, sort]);

  return (
    <section className="shell section page">
      <header className="page__header">
        <p className="eyebrow">Rent homes</p>
        <h1>Discover semi/fully furnished flats, PGs, rooms and 1 RK studios with zero brokerage surprises.</h1>
        <p>
          See owner-listed apartments, PG/co-living beds, society homes and independent houses with instant tour
          scheduling, 1/2/3 BHK filters, and e-agreements.
        </p>
      </header>

      <FiltersBar
        search={search}
        onSearchChange={setSearch}
        city={city}
        onCityChange={setCity}
        sort={sort}
        onSortChange={setSort}
        cityOptions={cityOptions}
        propertyType={propertyType}
        onPropertyTypeChange={setPropertyType}
        bhk={bhk}
        onBhkChange={setBhk}
        placeholder="Search by project, area or owner name"
      />

      {loading && <p>Loading…</p>}
      {error && <p className="error">Unable to load rent inventory.</p>}
      <div className="grid">
        {sortedListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

