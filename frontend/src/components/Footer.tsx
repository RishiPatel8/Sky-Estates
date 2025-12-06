import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Property search",
    links: [
      { label: "Buy homes", href: "/buy" },
      { label: "Rent homes", href: "/rent" },
      { label: "Commercial", href: "/sell" },
    ],
  },
  {
    title: "Owner services",
    links: [
      { label: "Post property", href: "/list" },
      { label: "Agreements", href: "/agreements" },
      { label: "Featured listings", href: "/sell" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Customer care", href: "/contact" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
    ],
  },
];

export const Footer = () => (
  <footer className="footer">
    <div className="shell footer__inner">
      <div>
        <div className="footer__brand">
          <span className="nav__glyph">▲</span>
          Skyline Estates
        </div>
        <p className="footer__copy">
          Skyline Estates is a full-stack property portal inspired by Magicbricks and 99acres—verified listings, locality
          insights, home loans, rent agreements, and 24x7 support for every Indian home seeker.
        </p>
      </div>

      <div className="footer__columns">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <p className="footer__title">{section.title}</p>
            <ul>
              {section.links.map((item) => (
                <li key={item.href}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="footer__note">2025 © Skyline Estates Pvt Ltd · RERA registered across major states</div>
  </footer>
);

