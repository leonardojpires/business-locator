import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Building2, MapPin, Search } from "lucide-react";

const apiBase = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [businesses, setBusinesses] = useState([]);
  const [status, setStatus] = useState("checking");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All locations");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [healthResponse, businessResponse] = await Promise.all([
          fetch(`${apiBase}/health`, { cache: "no-store" }),
          fetch(`${apiBase}/api/businesses`, { cache: "no-store" }),
        ]);
        if (active) setStatus(healthResponse.ok ? "Connected" : "Unavailable");
        if (!businessResponse.ok) throw new Error("Business listing unavailable");
        const data = await businessResponse.json();
        if (active) setBusinesses(Array.isArray(data) ? data : data.businesses || []);
      } catch {
        if (active) setStatus("Unavailable");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    const timer = setInterval(load, 15000);
    return () => { active = false; clearInterval(timer); };
  }, []);

  const cities = useMemo(() => [...new Set(businesses.map((business) => business.city).filter(Boolean))].sort(), [businesses]);
  const visibleBusinesses = useMemo(() => businesses.filter((business) => {
    const searchable = [business.name, business.address, business.city, business.department].filter(Boolean).join(" ").toLowerCase();
    return searchable.includes(query.toLowerCase()) && (city === "All locations" || business.city === city);
  }).sort((a, b) => (a.name || "").localeCompare(b.name || "")), [businesses, city, query]);

  return (
    <main className="page">
      <header className="header">
        <div className="brand"><span className="brand-icon"><MapPin size={19} /></span><span>Business Locator</span></div>
        <span className={`status ${status === "Connected" ? "online" : ""}`}><span />API {status}</span>
      </header>

      <section className="intro">
        <h1>Find local businesses</h1>
        <p>Search businesses by name, location, or activity.</p>
      </section>

      <section className="controls" aria-label="Directory search and filters">
        <label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search businesses…" /></label>
        <label className="location-select"><span>Location</span><select value={city} onChange={(event) => setCity(event.target.value)}><option>All locations</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
      </section>

      <section className="directory">
        <div className="section-heading"><h2>Businesses</h2>{!loading && <span>{visibleBusinesses.length}</span>}</div>
        {loading ? <p className="message">Loading businesses…</p> : status !== "Connected" ? <div className="message"><h3>Can’t connect to the API</h3><p>Check that the backend is running, then refresh this page.</p></div> : businesses.length === 0 ? <div className="message"><h3>No business listings available</h3><p>The API is responding, but it doesn’t currently provide a business listing endpoint.</p></div> : visibleBusinesses.length === 0 ? <p className="message">No businesses match your search.</p> : (
          <div className="business-list">{visibleBusinesses.map((business) => <article className="business-card" key={business.id || business.url || business.name}>
            <span className="business-icon"><Building2 size={19} /></span>
            <div className="business-info"><h3>{business.name || "Unnamed business"}</h3><p>{business.department || "Local business"}</p><span className="business-location"><MapPin size={14} />{business.city || business.address || "Location unavailable"}</span></div>
            {business.url && <a className="listing-link" href={business.url} target="_blank" rel="noreferrer" aria-label={`View ${business.name || "business"} listing`}><ArrowUpRight size={18} /></a>}
          </article>)}</div>
        )}
      </section>
      <footer>Business Locator</footer>
    </main>
  );
}
