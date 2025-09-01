import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import CountryPage from "./components/CountryPage/CountryPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");

  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    const next = !darkMode;
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    setDarkMode(next);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3")
      .then((res) => res.json())
      .then((data) => { setAllCountries(data); setLoading(false); })
      .catch((err) => { console.error("Fel vid hämtning:", err); setLoading(false); });
  }, []);

  const regions = useMemo(() => {
    const set = new Set(allCountries.map((c) => c.region).filter(Boolean));
    return Array.from(set).sort();
  }, [allCountries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allCountries.filter((c) => {
      const matchName = c.name?.common?.toLowerCase().includes(q);
      const matchRegion = region === "All" || c.region === region;
      return (!q || matchName) && matchRegion;
    });
  }, [allCountries, query, region]);

  const visible = filtered;

return (
  <div className="app">
    <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} />
    {loading ? (
      <LoadingScreen />
    ) : (
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              query={query}
              setQuery={setQuery}
              region={region}
              setRegion={setRegion}
              regions={regions}
              darkMode={darkMode}
              countries={visible}
            />
          }
        />
        <Route
          path="/country/:code"
          element={<CountryPage darkMode={darkMode} onToggleTheme={toggleTheme} />}
        />
      </Routes>
    )}
  </div>
);
}

export default App;
