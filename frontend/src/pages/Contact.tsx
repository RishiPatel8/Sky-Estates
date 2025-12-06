import { PrimaryButton } from "../components/PrimaryButton";

export const Contact = () => (
  <section className="shell section page">
    <header className="page__header">
      <p className="eyebrow">Help & support</p>
      <h1>Talk to Skyline just like you would with Magicbricks/99acres support.</h1>
      <p>24x7 helpline for buyers, tenants, owners, and brokers across India.</p>
    </header>
    <div className="glass contact">
      <p>Helpline: <a href="tel:18001202727">1800-120-2727</a> (toll-free)</p>
      <p>WhatsApp / SMS: +91 86579 12012</p>
      <p>Email: <a href="mailto:care@skyline.estates">care@skyline.estates</a></p>
      <p>Support hours: 24x7 for calls · 9 AM – 10 PM for home visits</p>
      <PrimaryButton to="/list" variant="ghost">
        Post property for free
      </PrimaryButton>
    </div>
  </section>
);

