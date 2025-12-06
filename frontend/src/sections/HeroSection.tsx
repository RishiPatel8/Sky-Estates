import { PrimaryButton } from "../components/PrimaryButton";

export const HeroSection = () => (
  <section className="hero">
    <div className="hero__container">
      <div className="hero__content">
        <h1 className="text-center">
          Find your <span className="text-gradient">dream home</span> in the perfect neighborhood
        </h1>
        <p className="hero__subtitle text-center">
          Browse thousands of properties for sale and rent, with the most listings and verified information
        </p>
        <div className="hero__cta">
          <PrimaryButton to="/buy">Browse Properties</PrimaryButton>
          <PrimaryButton variant="ghost" to="/list">
            List Your Property
          </PrimaryButton>
        </div>
        <ul className="hero__features">
          <li>
            <span className="hero__feature-number">10K+</span>
            <span className="hero__feature-label">Properties</span>
          </li>
          <li>
            <span className="hero__feature-number">100+</span>
            <span className="hero__feature-label">Locations</span>
          </li>
          <li>
            <span className="hero__feature-number">24/7</span>
            <span className="hero__feature-label">Support</span>
          </li>
        </ul>
      </div>
      <div className="hero__image">
        <img 
          src="/images/hero-house.jpg" 
          alt="Beautiful modern house"
          className="hero__img"
        />
      </div>
    </div>
  </section>
);
