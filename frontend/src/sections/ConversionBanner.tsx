import { PrimaryButton } from "../components/PrimaryButton";

export const ConversionBanner = () => (
  <section className="conversion">
    <div className="shell conversion__inner glass">
      <div>
        <p className="eyebrow">Need help deciding?</p>
        <h2>Talk to Skyline advisors or explore everything on the go.</h2>
        <p>Get personalised property matches, neighbourhood reports, and home-loan offers on call or via the app.</p>
      </div>
      <div className="conversion__actions">
        <PrimaryButton to="/contact">Call 1800-120-2727</PrimaryButton>
        <PrimaryButton variant="ghost" to="/list">
          Post property for free
        </PrimaryButton>
      </div>
    </div>
  </section>
);

