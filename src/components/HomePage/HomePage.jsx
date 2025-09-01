// HomePage.jsx
import "./HomePage.css";
import Search from "../Search/Search.jsx";
import Filter from "../Filter/Filter.jsx";
import Cards from "../Cards/Cards.jsx";

export default function HomePage({
  query, setQuery,
  region, setRegion,
  regions, darkMode,
  countries,
  loading,                          // ⬅️ ta emot
}) {
  return (
  <div className="container home-page">
    <div className="controls" aria-busy={loading}>
      <Search
        value={query}
        onChange={setQuery}
        placeholder="Search for a country..."
      />
      <Filter
        regions={regions}
        value={region}
        onChange={setRegion}
        darkMode={darkMode}
      />
    </div>

    {loading ? (
      <SkeletonCards count={8} />
    ) : (
      <Cards countries={countries} />
    )}
  </div>
);

}
