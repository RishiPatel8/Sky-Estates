import { useEffect, useMemo, useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { useListings } from "../hooks/useListings";
import { FiltersBar } from "../components/FiltersBar";
import { ListingCard } from "../components/ListingCard";
import type { Listing, ListingSort } from "../types";

const commitments = [
  "Free property listing with HD photos, video walkthroughs, and WhatsApp leads",
  "Daily dashboard showing buyer enquiries, site visit count, and top broker partners",
  "Featured placement across homepage banners + email/SMS campaigns",
  "Assistance with price benchmarking, negotiation, and paperwork till registry",
];

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

export const Sell = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [sort, setSort] = useState<ListingSort>("relevance");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState("all");
  const [bhk, setBhk] = useState("all");

  const { listings, loading, error } = useListings({
    mode: "sell",
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
        <p className="eyebrow">Sell / advertise</p>
        <h1>Post your apartment, villa, society home or rental portfolio for free.</h1>
        <p>
          Reach serious buyers and tenants instantly with Skyline's Magicbricks-style listing experience across 1/2/3
          BHK flats, independent houses, PG buildings and commercial assets.
        </p>
      </header>
      <div className="sell__grid">
        <div className="glass sell__card">
          <h3>Mandate commitments</h3>
          <ul>
            {commitments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="glass sell__card">
          <h3>Ready to go live?</h3>
          <p>Upload property details, schedule verification, and start receiving leads within hours.</p>
          <PrimaryButton to="/list">Post property now</PrimaryButton>
        </div>
      </div>

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
        placeholder="Search by project, builder or location"
      />

      {loading && <p>Loading…</p>}
      {error && <p className="error">Unable to load sale inventory.</p>}
      <div className="grid">
        {sortedListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

