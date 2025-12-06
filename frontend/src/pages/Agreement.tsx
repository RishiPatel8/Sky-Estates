import { PrimaryButton } from "../components/PrimaryButton";

const docList = [
  { title: "Owner listing agreement", detail: "Free listing, featured upgrades, exclusive/ open options, payout timelines." },
  {
    title: "Buyer token receipt",
    detail: "Standard format used across major portals with builder stamp, refund clauses, and cheque / UPI support.",
  },
  {
    title: "Rent agreement + e-stamp",
    detail: "State-ready drafts (MH, KA, TN, DL, TG) with biometric/eSign and courier service.",
  },
  {
    title: "Home services T&C",
    detail: "Covers site visits, property inspections, loan processing, and customer support escalations.",
  },
];

const whatToExpect = [
  "Editable DOCX + PDF templates available in English, Hindi, Marathi, Kannada, and Tamil.",
  "Each document carries RERA registration numbers, builder IDs, and Skyline helpline references.",
  "Step-by-step guide on stamp duty, registration office visits, and digital storage on Skyline Vault.",
  "Priority assistance from Skyline legal desk for custom clauses or dispute resolution.",
];

export const Agreement = () => (
  <section className="shell section page">
    <header className="page__header">
      <p className="eyebrow">Agreements</p>
      <h1>All the paperwork Magicbricks & 99acres users expect—ready in one click.</h1>
      <p>Download, edit, or request doorstep execution. Templates are updated with latest state rules and RERA circulars.</p>
    </header>

    <div className="glass agreement-page__docs">
      <h3>Documents included</h3>
      <ul>
        {docList.map((doc) => (
          <li key={doc.title}>
            <strong>{doc.title}</strong>
            <span>{doc.detail}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="glass agreement-page__notes">
      <h3>What you get</h3>
      <ul>
        {whatToExpect.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <PrimaryButton to="/contact">Request editable copies</PrimaryButton>
    </div>
  </section>
);

