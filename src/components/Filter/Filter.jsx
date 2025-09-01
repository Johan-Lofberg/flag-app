import { useState, useRef, useEffect } from "react";
import "./Filter.css";
import arrowDownDark from "../../assets/arrow-down-dark.svg";
import arrowDownLight from "../../assets/arrow-down-light.svg";

function Filter({ regions = [], value = "All", onChange, darkMode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const label = value && value !== "All" ? value : "Filter by Region";

  return (
    <div className="filter" ref={ref}>
      <button
      className={`filter-button ${open ? "is-open" : ""}`}
      onClick={() => setOpen(v => !v)}
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      {label}
      <img
        className="arrowDown"
        src={darkMode ? arrowDownLight : arrowDownDark}
        alt=""
      />
    </button>

      {open && (
        <div className="filter-menu">
          {["All", ...regions].map(r => (
            <button
              key={r || "unknown"}
              className={`filter-item ${value === r ? "active" : ""}`}
              onClick={() => { onChange(r); setOpen(false); }}
            >
              {r || "Okänd"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;
