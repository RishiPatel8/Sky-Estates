import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PrimaryButton } from "./PrimaryButton";
import { useAuth } from "../hooks/useAuth";

const links = [
  { label: "Buy", path: "/buy" },
  { label: "Rent", path: "/rent" },
  { label: "Sell", path: "/sell" },
  { label: "Market Pulse", path: "/#market" },
  { label: "EMI Calculator", path: "/emi-calculator" },
  { label: "Agreements", path: "/agreements" },
  { label: "Investors", path: "/contact" },
  { label: "Dashboard", path: "/dashboard" },
];

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleListProperty = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: '/list' } });
    } else {
      navigate('/list');
    }
  };

  const handleDashboardClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: '/dashboard' } });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="nav">
      <div className="shell nav__inner">
        <Link className="nav__brand" to="/">
          <span className="nav__glyph">▲</span>
          Skyline Estates
        </Link>

        <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "nav__link nav__link--active" : "nav__link")}
              onClick={(e) => {
                setOpen(false);
                if (item.path === '/dashboard') {
                  handleDashboardClick(e);
                } else if (item.path === '/list') {
                  handleListProperty(e);
                }
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__cta">
          <PrimaryButton variant="ghost" to="/list" onClick={handleListProperty}>
            List Property
          </PrimaryButton>
          {!user && (
            <>
              <PrimaryButton variant="ghost" to="/login">
                Login
              </PrimaryButton>
              <PrimaryButton to="/signup">Sign up</PrimaryButton>
            </>
          )}
          {user && (
            <>
              <PrimaryButton variant="ghost" to="/dashboard" onClick={handleDashboardClick}>
                Dashboard
              </PrimaryButton>
              <button
                type="button"
                className="nav__logout"
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button aria-label="Toggle menu" className="nav__burger" onClick={toggle}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

