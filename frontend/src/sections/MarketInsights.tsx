const insights = [
  {
    label: "MMR 2 BHK avg price",
    stat: "₹1.89 Cr",
    detail: "Source: Skyline price index · +6.4% QoQ",
  },
  {
    label: "Bengaluru rent jump",
    stat: "11.2%",
    detail: "Whitefield, Sarjapur, North Bangalore corridors",
  },
  {
    label: "Site visit to closure",
    stat: "18 days",
    detail: "Avg duration for resale flats on Skyline",
  },
];

export const MarketInsights = () => (
  <section id="market" className="shell section market">
    <p className="eyebrow">Market pulse</p>
    <h2>Locality trends & price indexes updated weekly.</h2>
    <div className="market__grid">
      {insights.map((insight) => (
        <article key={insight.label} className="market__card glass">
          <p className="market__stat">{insight.stat}</p>
          <p className="market__label">{insight.label}</p>
          <p>{insight.detail}</p>
        </article>
      ))}
    </div>
  </section>
);

