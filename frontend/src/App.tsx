import type { ReactNode } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Buy } from "./pages/Buy";
import { Rent } from "./pages/Rent";
import { Sell } from "./pages/Sell";
import { ListProperty } from "./pages/ListProperty";
import { Contact } from "./pages/Contact";
import { Agreement } from "./pages/Agreement";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Enquire } from "./pages/Enquire";
import EMICalculatorPage from "./pages/EMICalculatorPage";
import { useAuth } from "./hooks/useAuth";

const NotFound = () => (
  <section className="shell section page">
    <h1>Page not found</h1>
    <p>This route is in progress. Head back home to continue exploring inventory.</p>
  </section>
);

const App = () => {
  const { user } = useAuth();

  const RequireAuth = ({ children }: { children: ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="app">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/sell" element={<Sell />} />
          <Route
            path="/list"
            element={
              <RequireAuth>
                <ListProperty />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/enquire/:id"
            element={
              <RequireAuth>
                <Enquire />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/agreements" element={<Agreement />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/emi-calculator" element={<EMICalculatorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

