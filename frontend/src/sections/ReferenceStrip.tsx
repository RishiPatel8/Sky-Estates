const partners = ["DLF", "Godrej Properties", "Prestige Group", "Sobha", "Tata Housing", "Puravankara"];

const testimonials = [
  {
    quote:
      "Posted my 2 BHK in Wakad and had 17 verified tenants within 48 hours. The Skyline advisor handled visits just like the big portals.",
    author: "Prashant Kulkarni · Owner",
  },
  {
    quote:
      "We launched a new tower in Whitefield and Skyline drove 63% of our site visits, complete with locality reports and loan desks.",
    author: "Meera Iyer · Sales Head, Orion Developers",
  },
];

export const ReferenceStrip = () => (
  <section className="reference">
    <div className="shell">
      <div className="reference__logos">
        {partners.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
      <div className="reference__quotes">
        {testimonials.map((item) => (
          <blockquote key={item.author}>
            “{item.quote}”
            <cite>{item.author}</cite>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
);

