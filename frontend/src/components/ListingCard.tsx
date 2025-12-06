import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Listing } from "../types";
import { formatListingPrice } from "../hooks/useListings";

interface Props {
  listing: Listing;
}

export const ListingCard = ({ listing }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <article className="listing glass">
      <div className="listing__media">
        <img src={listing.heroImage} alt={listing.title} loading="lazy" />
        <span className={`listing__mode listing__mode--${listing.mode}`}>{listing.mode}</span>
      </div>
      <div className="listing__body">
        <p className="listing__developer">{listing.developer}</p>
        <h3>{listing.title}</h3>
        <p className="listing__location">
          {listing.location.neighborhood}, {listing.location.city}
        </p>
        {listing.location.addressLine && (
          <p className="listing__address">
            {listing.location.addressLine} · {listing.location.state} {listing.location.pincode}
          </p>
        )}
        <p className="listing__price">{formatListingPrice(listing)}</p>
        <div className="listing__meta">
          <span>{listing.beds} beds</span>
          <span>{listing.baths} baths</span>
          <span>{listing.areaSqFt.toLocaleString()} sq.ft</span>
        </div>
        <div className="listing__tags">
          {listing.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="listing__actions">
          <a className="btn btn--ghost" href={listing.heroImage} target="_blank" rel="noopener noreferrer">
            View photos
          </a>
          <button className="btn btn--solid" onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? "Hide details" : "View details"}
          </button>
          <button className="btn btn--ghost" onClick={() => navigate(`/login?next=/enquire/${listing.id}`)}>
            Enquire
          </button>
        </div>
        {expanded && (
          <div className="listing__details">
            <p>{listing.description}</p>
            {listing.amenities.length > 0 && (
              <>
                <strong>Amenities</strong>
                <ul>
                  {listing.amenities.slice(0, 5).map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

