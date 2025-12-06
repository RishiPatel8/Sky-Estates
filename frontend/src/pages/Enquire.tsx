import { type FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { api } from "../api/client";
import type { Listing } from "../types";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAuth } from "../hooks/useAuth";

interface ListingsResponse {
  ok: boolean;
  count: number;
  listings: Listing[];
}

export const Enquire = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("I am interested in this property. Please contact me.");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const { data, error } = useSWR<ListingsResponse>("/listings", (key: string) =>
    api.get<ListingsResponse>(key).then((res) => res.data)
  );

  if (error) {
    return (
      <section className="shell section page">
        <h1>Enquire</h1>
        <p className="error">Unable to load property details. Please try again.</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="shell section page">
        <h1>Enquire</h1>
        <p>Loading property details…</p>
      </section>
    );
  }

  const listing = data.listings.find((item) => item.id === id);

  if (!listing) {
    return (
      <section className="shell section page">
        <h1>Enquire</h1>
        <p className="error">We couldn't find this property. It may have been removed.</p>
      </section>
    );
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    // For now, just simulate a successful enquiry without persisting.
    setTimeout(() => {
      setSubmitting(false);
      setStatus("Your enquiry has been submitted. Our team will contact you shortly.");
    }, 600);
  };

  return (
    <section className="shell section page">
      <header className="page__header">
        <p className="eyebrow">Enquire about this property</p>
        <h1>{listing.title}</h1>
        <p>
          {listing.location.neighborhood}, {listing.location.city} · {listing.beds} beds · {listing.areaSqFt.toLocaleString()} sq.ft
        </p>
      </header>

      <form className="list-form glass" onSubmit={handleSubmit}>
        <label>
          Name
          <input defaultValue={user?.name || ""} placeholder="Your name" required />
        </label>
        <label>
          Email
          <input type="email" defaultValue={user?.email || ""} placeholder="you@example.com" required />
        </label>
        <label>
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
            required
          />
        </label>
        <label>
          Message
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
        </label>
        <PrimaryButton type="submit" disabled={submitting}>
          {submitting ? "Sending enquiry…" : "Send enquiry"}
        </PrimaryButton>
        {status && <p className="list-form__message">{status}</p>}
      </form>
    </section>
  );
};
