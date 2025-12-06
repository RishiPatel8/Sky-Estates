const traction = [
  { label: "Active owners", value: "4.5 Lakh+", detail: "Listing new homes, plots, and resale flats" },
  { label: "Site visits scheduled", value: "12,400/week", detail: "Managed by Skyline relationship managers" },
  { label: "Verified agents", value: "8,200+", detail: "RERA-registered brokers on the platform" },
  { label: "Home loan partners", value: "28 banks", detail: "Instant eligibility checks & doorstep service" },
];

export const TractionStrip = () => (
  <section className="traction">
    <div className="shell traction__inner glass">
      {traction.map((item) => (
        <div key={item.label}>
          <p className="traction__value">{item.value}</p>
          <p className="traction__label">{item.label}</p>
          <p className="traction__detail">{item.detail}</p>
        </div>
      ))}
    </div>
  </section>
);

