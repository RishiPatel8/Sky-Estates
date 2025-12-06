import { type FormEvent, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PrimaryButton } from "../components/PrimaryButton";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const result = await login(email, password);
      if (result.ok) {
        // Check for redirect in location state first, then in URL params
        const from = (location.state as { from?: string })?.from;
        const params = new URLSearchParams(location.search);
        const next = from || params.get("next") || "/dashboard";
        navigate(next, { replace: true });
      }
    } catch (error) {
      setMessage((error as Error).message || 'An error occurred during login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="shell section page">
      <header className="page__header">
        <p className="eyebrow">Sign in</p>
        <h1>Sign in to manage your buy / sell / rent activity.</h1>
        <p>Track your listings, see interested activity, and continue from where you left off.</p>
      </header>
      <form className="list-form glass" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <PrimaryButton type="submit" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </PrimaryButton>
        {message && <p className="list-form__message">{message}</p>}
        <p className="list-form__hint">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </section>
  );
};
