import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { api } from "../api/client";
import type { ListingMode } from "../types";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAuth } from "../hooks/useAuth";

const defaultState = {
  title: "",
  developer: "",
  description: "",
  mode: "sell" as ListingMode,
  category: "residential",
  price: "",
  currency: "INR",
  areaSqFt: "",
  beds: "",
  baths: "",
  city: "",
  neighborhood: "",
  heroImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
};

export const ListProperty = () => {
  const [form, setForm] = useState(defaultState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      await api.post("/listings", {
        title: form.title,
        developer: form.developer || "Independent Owner",
        description: form.description,
        mode: form.mode,
        category: form.category,
        price: Number(form.price),
        currency: form.currency,
        areaSqFt: Number(form.areaSqFt),
        beds: Number(form.beds),
        baths: Number(form.baths),
        location: { city: form.city, neighborhood: form.neighborhood },
        tags: ["community listing"],
        amenities: [],
        heroImage: form.heroImage,
        gallery: [form.heroImage],
        yield: 0,
        status: "submitted",
        yearBuilt: new Date().getFullYear(),
        ownerId: user?.id ?? null,
      });
      setMessage("Thanks! Your property is under review. We will publish it within a few hours after verification.");
      setForm({ ...defaultState });
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="shell section page">
      <header className="page__header">
        <p className="eyebrow">List a property</p>
        <h1>Post on Skyline just like Magicbricks & 99acres—free, fast, verified.</h1>
        <p>Fill in the basics, upload photos, and let buyers/tenants reach you directly. Our team verifies every post.</p>
      </header>
      <form className="list-form glass" onSubmit={handleSubmit}>
        <div className="list-form__group">
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>
            Developer / Owner
            <input name="developer" value={form.developer} onChange={handleChange} />
          </label>
        </div>

        <div className="list-form__group">
          <label>
            Mode
            <select name="mode" value={form.mode} onChange={handleChange}>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
              <option value="sell">Sell</option>
            </select>
          </label>
          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange} />
          </label>
        </div>

        <div className="list-form__group">
          <label>
            Price (₹)
            <input type="number" name="price" value={form.price} onChange={handleChange} required />
          </label>
          <label>
            Area (sq.ft)
            <input type="number" name="areaSqFt" value={form.areaSqFt} onChange={handleChange} required />
          </label>
        </div>

        <div className="list-form__group">
          <label>
            Beds
            <input type="number" name="beds" value={form.beds} onChange={handleChange} required />
          </label>
          <label>
            Baths
            <input type="number" name="baths" value={form.baths} onChange={handleChange} required />
          </label>
        </div>

        <div className="list-form__group">
          <label>
            City
            <input name="city" value={form.city} onChange={handleChange} required />
          </label>
          <label>
            Neighborhood
            <input name="neighborhood" value={form.neighborhood} onChange={handleChange} required />
          </label>
        </div>

        <label>
          Hero image URL
          <input name="heroImage" value={form.heroImage} onChange={handleChange} />
        </label>

        <label>
          Summary
          <textarea name="description" rows={4} value={form.description} onChange={handleChange} required />
        </label>

        <PrimaryButton type="submit" disabled={submitting}>
          {submitting ? "Publishing…" : "Post property"}
        </PrimaryButton>
        {message && <p className="list-form__message">{message}</p>}
      </form>
    </section>
  );
};

