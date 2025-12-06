import type { Listing } from "../types";
import { ListingCard } from "../components/ListingCard";
import { PrimaryButton } from "../components/PrimaryButton";

interface Props {
  title: string;
  highlight: string;
  listings: Listing[];
  to: string;
}

export const FeaturedSection = ({ title, highlight, listings, to }: Props) => (
  <section className="shell section">
    <div className="section__head">
      <div>
        <p className="eyebrow">{highlight}</p>
        <h2>{title}</h2>
      </div>
      <PrimaryButton variant="ghost" to={to}>
        View all
      </PrimaryButton>
    </div>
    <div className="grid">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  </section>
);

