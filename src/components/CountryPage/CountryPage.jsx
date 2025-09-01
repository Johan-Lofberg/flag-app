import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CountryPage.css";
import arrowLeftDark from "../../assets/arrow-left-dark.svg";
import arrowLeftLight from "../../assets/arrow-left.svg";

// ---- Hjälpfunktioner ----
const fmt = new Intl.NumberFormat("sv-SE");

function nativeName(nameObj) {
  const n = nameObj?.nativeName;
  if (!n) return nameObj?.common || "";
  const first = Object.values(n)[0];
  return first?.common || nameObj?.common || "";
}

function currencyList(currencies) {
  if (!currencies) return "";
  return Object.values(currencies)
    .map((c) => c.name)
    .join(", ");
}

function languageList(langs) {
  if (!langs) return "";
  return Object.values(langs).join(", ");
}

// ---- Komponent ----
export default function CountryPage({ darkMode, onToggleTheme }) {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Hämta land-data
  useEffect(() => {
    setLoading(true);
    setErr(null);

    fetch(
      `https://restcountries.com/v3.1/alpha/${code}?fields=` +
        [
          "name",
          "flags",
          "region",
          "subregion",
          "population",
          "capital",
          "tld",
          "currencies",
          "languages",
          "borders",
          "cca3",
        ].join(",")
    )
      .then((r) => {
        if (!r.ok) throw new Error("Misslyckades att hämta landet");
        return r.json();
      })
      .then((data) => {
        const item = Array.isArray(data) ? data[0] : data;
        setCountry(item || null);
      })
      .catch((e) => setErr(e.message || "Okänt fel"))
      .finally(() => setLoading(false));
  }, [code]);

  // Hämta grannländer
  useEffect(() => {
    if (!country?.borders?.length) {
      setNeighbors([]);
      return;
    }
    const codes = country.borders.join(",");
    fetch(
      `https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,cca3`
    )
      .then((r) => r.json())
      .then((list) =>
        setNeighbors(
          (Array.isArray(list) ? list : []).map((x) => ({
            cca3: x.cca3,
            name: x.name?.common,
          }))
        )
      )
      .catch(() => setNeighbors([]));
  }, [country]);

  // ---- Render ----
  if (loading) return <div className="container">Laddar…</div>;
  if (err) return <div className="container">Fel: {err}</div>;
  if (!country) return <div className="container">Hittade inte landet.</div>;

  return (
    <div className="container country-page">
      <Link to="/" className="back-button">
        <img
          src={darkMode ? arrowLeftLight : arrowLeftDark}
          alt=""
          className="arrow-left"
        />
        <span>Back</span>
      </Link>

      <div className="country-layout">
        <div className="country-flag-wrap">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={country.flags?.alt || country.name?.common}
            className="country-flag"
          />
        </div>

        <div className="country-info">
          <h2>{country.name?.common}</h2>

          <div className="country-details">
            <div className="info1">
              <p>
              <span className="semibold-text">Population: </span>{" "}
              {fmt.format(country.population)}
            </p>
            <p>
              <span className="semibold-text">Region: </span> {country.region}
              {country.subregion ? `, ${country.subregion}` : ""}
            </p>
            <p>
              <span className="semibold-text">Capital: </span>{" "}
              {country.capital?.[0] || "—"}
            </p>
            <p>
              <span className="semibold-text">Native name: </span>{" "}
              {nativeName(country.name)}
            </p>
            </div>
            <div className="info2">
              <p>
              <span className="semibold-text">Top Level Domain: </span>{" "}
              {country.tld?.[0] || "—"}
            </p>
            <p>
              <span className="semibold-text">Currencies: </span>{" "}
              {currencyList(country.currencies) || "—"}
            </p>
            <p>
              <span className="semibold-text">Languages: </span>{" "}
              {languageList(country.languages) || "—"}
            </p>
            </div>
            
          </div>

          <div className="borders">
            {" "}
            <span className="semibold-text">Border Countries: </span>
            {neighbors.length === 0
              ? "—"
              : neighbors.map((n) => (
                  <Link
                    key={n.cca3}
                    to={`/country/${n.cca3}`}
                    className="border-link"
                  >
                    {n.name}
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
