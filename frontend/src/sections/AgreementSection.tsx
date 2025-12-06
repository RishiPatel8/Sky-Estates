import { PrimaryButton } from "../components/PrimaryButton";

const agreements = [
  {
    title: "Online rent agreement",
    copy: "Create government-stamped rent agreements with biometric eKYC and doorstep witnessing.",
    items: ["Ready in 24 hours", "Stamp duty calculator", "Automatic renewal reminders"],
  },
  {
    title: "Owner listing terms",
    copy: "Clear policy that spells out listing duration, promotion credits, and verified badge requirements.",
    items: ["Unlimited edits", "Featured listing upgrades", "Broker connect opt-in"],
  },
  {
    title: "Buyer protection policy",
    copy: "Detailed token / booking process with refund clauses, builder verification, and helpline escalation matrix.",
    items: ["Token receipt template", "Escrow guidance", "Dispute resolution hotline"],
  },
];

const timeline = [
  { label: "Day 0", detail: "Post property · receive verification call" },
  { label: "Day 2-3", detail: "Documents picked up / uploaded & listing goes live" },
  { label: "Day 5", detail: "Leads shared + site visits scheduled" },
  { label: "Day 10", detail: "Token / booking agreement issued digitally" },
  { label: "Day 30+", detail: "Sale deed / rental agreement executed with Skyline support" },
];

export const AgreementSection = () => (
  <section className="shell section agreement">
    <header className="section__head">
      <div>
        <p className="eyebrow">Agreements & compliance</p>
        <h2>Transparent paperwork, zero surprises.</h2>
        <p>
          Every Skyline user gets ready-to-use documents similar to the best of Magicbricks and 99acres—multi-language,
          RERA-linked, and backed by our legal concierge.
        </p>
      </div>
      <PrimaryButton to="/agreements" variant="ghost">
        View sample agreements
      </PrimaryButton>
    </header>

    <div className="agreement__grid">
      {agreements.map((agreement) => (
        <article key={agreement.title} className="glass agreement__card">
          <h3>{agreement.title}</h3>
          <p>{agreement.copy}</p>
          <ul>
            {agreement.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>

    <div className="agreement__timeline glass">
      <h3>Closing timeline</h3>
      <ol>
        {timeline.map((step) => (
          <li key={step.label}>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
      <PrimaryButton to="/contact">Talk to legal desk</PrimaryButton>
    </div>
  </section>
);

