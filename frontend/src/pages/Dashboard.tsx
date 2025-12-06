import useSWR from "swr";
import { api } from "../api/client";
import type { Listing } from "../types";
import { ListingCard } from "../components/ListingCard";

interface MeActivityResponse {
  ok: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
  summary: {
    count: number;
    modes: Record<string, number>;
  };
  listings: Listing[];
}

export const Dashboard = () => {
  const { data, error, mutate } = useSWR<MeActivityResponse>("/me/activity", (key: string) =>
    api.get<MeActivityResponse>(key).then((res) => res.data)
  );

  if (error) {
    return (
      <section className="shell section page">
        <h1>Dashboard</h1>
        <p className="error">Unable to load your activity. Please ensure you are signed in.</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="shell section page">
        <h1>Dashboard</h1>
        <p>Loading your activity…</p>
      </section>
    );
  }

  const { user, summary, listings } = data;

  return (
    <section className="shell section page">
      <header className="page__header">
        <p className="eyebrow">Your Skyline activity</p>
        <h1>Welcome back, {user.name || user.email}.</h1>
        <p>
          You have {summary.count} active properties across buy, rent and sell. Use this dashboard to track and edit your
          listings.
        </p>
      </header>

      <div className="glass dashboard__summary">
        <h3>Overview</h3>
        <ul>
          <li>
            <strong>Total listings:</strong> {summary.count}
          </li>
          <li>
            <strong>Buy:</strong> {summary.modes.buy || 0}
          </li>
          <li>
            <strong>Rent:</strong> {summary.modes.rent || 0}
          </li>
          <li>
            <strong>Sell:</strong> {summary.modes.sell || 0}
          </li>
        </ul>
      </div>

      <div className="grid">
        {listings.map((listing) => (
          <div key={listing.id} className="dashboard__listing">
            <ListingCard listing={listing} />
            <div className="dashboard__actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={async () => {
                  await api.patch(`/listings/${listing.id}`, { status: "sold" });
                  await mutate();
                }}
              >
                Mark as sold
              </button>
              <button
                type="button"
                className="btn btn--danger"
                onClick={async () => {
                  if (!window.confirm("Delete this listing permanently?")) return;
                  await api.delete(`/listings/${listing.id}`);
                  await mutate();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {listings.length === 0 && <p>You do not have any listings yet. List a property to see it here.</p>}
      </div>
    </section>
  );
};
