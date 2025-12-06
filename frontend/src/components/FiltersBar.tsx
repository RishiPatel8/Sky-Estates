import type { ListingSort } from "../types";

interface FiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  sort: ListingSort;
  onSortChange: (value: ListingSort) => void;
  cityOptions: string[];
  placeholder?: string;
  propertyType?: string;
  onPropertyTypeChange?: (value: string) => void;
  bhk?: string;
  onBhkChange?: (value: string) => void;
}

export const FiltersBar = ({
  search,
  onSearchChange,
  city,
  onCityChange,
  sort,
  onSortChange,
  cityOptions,
  placeholder = "Search by project, builder, or RERA ID",
  propertyType = "all",
  onPropertyTypeChange,
  bhk = "all",
  onBhkChange,
}: FiltersBarProps) => {
  return (
    <div className="filters glass">
      <div className="filters__group">
        <label>
          Search
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={placeholder}
          />
        </label>
      </div>
      <div className="filters__group">
        <label>
          Property type
          <select
            value={propertyType}
            onChange={(event) => onPropertyTypeChange?.(event.target.value)}
          >
            <option value="all">All types</option>
            <option value="apartment">Apartment / Flat</option>
            <option value="villa">Villa</option>
            <option value="society-flat">Society flat</option>
            <option value="independent-house">Independent house</option>
            <option value="pg">PG / Co-living</option>
            <option value="room">Room</option>
            <option value="1rk">1 RK / Studio</option>
          </select>
        </label>
      </div>
      <div className="filters__group">
        <label>
          BHK
          <select value={bhk} onChange={(event) => onBhkChange?.(event.target.value)}>
            <option value="all">All</option>
            <option value="1bhk">1 BHK / 1 RK</option>
            <option value="2bhk">2 BHK</option>
            <option value="3plus">3 BHK+</option>
          </select>
        </label>
      </div>
      <div className="filters__group">
        <label>
          City
          <select value={city} onChange={(event) => onCityChange(event.target.value)}>
            <option value="all">All cities</option>
            {cityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="filters__group">
        <label>
          Sort by
          <select value={sort} onChange={(event) => onSortChange(event.target.value as ListingSort)}>
            <option value="relevance">Relevance</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="newest">Newest first</option>
          </select>
        </label>
      </div>
    </div>
  );
};

