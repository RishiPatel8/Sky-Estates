import { type FormEvent, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PrimaryButton } from "../components/PrimaryButton";

export const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
   const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const result = await register(name, email, password);
      if (result.ok) {
        const params = new URLSearchParams(location.search);
        const next = params.get("next") || "/dashboard";
        navigate(next);
      }
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="shell section page">
      <header className="page__header">
        <p className="eyebrow">Create account</p>
        <h1>Create your Skyline account.</h1>
        <p>Save your shortlisted properties and manage your listings from one dashboard.</p>
      </header>
      <form className="list-form glass" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <PrimaryButton type="submit" disabled={submitting}>
          {submitting ? "Creating account…" : "Sign up"}
        </PrimaryButton>
        {message && <p className="list-form__message">{message}</p>}
        <p className="list-form__hint">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </section>
  );
};
