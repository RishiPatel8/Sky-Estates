import { HeroSection } from "../sections/HeroSection";
import { FeaturedSection } from "../sections/FeaturedSection";
import { MarketInsights } from "../sections/MarketInsights";
import { ReferenceStrip } from "../sections/ReferenceStrip";
import { TractionStrip } from "../sections/TractionStrip";
import { AgreementSection } from "../sections/AgreementSection";
import { CapitalStack } from "../sections/CapitalStack";
import { ConversionBanner } from "../sections/ConversionBanner";
import { useFeatureBuckets } from "../hooks/useListings";

export const Home = () => {
  const { buy, rent, sell, loading, error } = useFeatureBuckets();

  return (
    <>
      <HeroSection />
      {loading && <p className="shell section">Syncing featured inventory…</p>}
      {error && (
        <p className="shell section error">
          Could not load featured inventory. Please ensure the backend is running.
        </p>
      )}
      {!loading && !error && (
        <>
          <FeaturedSection title="Ready-to-buy assets" highlight="Mandated inventory" listings={buy} to="/buy" />
          <FeaturedSection title="Curated rentals" highlight="Managed yield" listings={rent} to="/rent" />
          <FeaturedSection title="Developer & landlord mandates" highlight="Sell-side desk" listings={sell} to="/sell" />
        </>
      )}
      <TractionStrip />
      <MarketInsights />
      <AgreementSection />
      <CapitalStack />
      <ReferenceStrip />
      <ConversionBanner />
    </>
  );
};

