import "./Cards.css";
import { Link } from "react-router-dom";

function Cards({ countries = [] }) {
  if (!countries.length) {
    return <p className="cards-empty">Inga länder att visa.</p>;
  }

return (
  <section className="container cards">
    {countries.map((c) => (
      <Link
        key={c.cca3}
        to={`/country/${c.cca3}`}
        className="card-link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <article className="card">
          <div className="card-flag-wrap">
            <img
              src={c.flags?.png || c.flags?.svg}
              alt={c.flags?.alt || `Flagga för ${c.name.common}`}
              loading="lazy"
              className="card-flag"
            />
          </div>
          <div className="card-body">
            <h3 className="card-title">{c.name.common}</h3>
            <p className="population">Population: {c.population}</p>
            <p className="region">Region: {c.region}</p>
            <p className="capital">Capital: {c.capital}</p>
          </div>
        </article>
      </Link>
    ))}
  </section>
)
}

export default Cards;
