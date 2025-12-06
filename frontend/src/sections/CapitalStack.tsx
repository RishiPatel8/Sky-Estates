const services = [
  {
    title: "Buyer assist",
    detail: "Dedicated relationship manager, locality comparisons, digital site visit scheduler.",
  },
  {
    title: "Home loans",
    detail: "Tie-ups with SBI, HDFC, Axis Bank for instant eligibility and lowest ROI alerts.",
  },
  {
    title: "Rental management",
    detail: "Tenant discovery, background checks, rent agreements, and on-call maintenance.",
  },
];

const assurances = [
  "Every listing is RERA-tagged with builder and property IDs verified by our quality team.",
  "Price trends are refreshed weekly using transaction data from 400+ micro markets.",
  "24x7 helpline plus multilingual chat assistants for NRIs and outstation users.",
];

export const CapitalStack = () => (
  <section className="shell section capital">
    <header className="section__head">
      <div>
        <p className="eyebrow">Skyline services</p>
        <h2>Everything you expect from Magicbricks / 99acres, in one tab.</h2>
      </div>
    </header>
    <div className="capital__grid">
      <div className="glass capital__card">
        <h3>Top tools</h3>
        <ul>
          {services.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass capital__card">
        <h3>Why users trust us</h3>
        <ul>
          {assurances.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="glass capital__card capital__highlight">
        <p className="eyebrow">Need help?</p>
        <h3>Talk to a property expert in under 60 seconds.</h3>
        <p>Call 1800-120-2727 or request a callback for site visits, price negotiations, or loan support.</p>
        <p className="capital__note">Serviceable across top metros + fast-growing tier-2 cities.</p>
      </div>
    </div>
  </section>
);

