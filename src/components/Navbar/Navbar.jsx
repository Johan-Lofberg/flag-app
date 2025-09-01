import "./Navbar.css";
import logoDark from "../../assets/techover-logo-dark.png";
import logoLight from "../../assets/techover-logo.png";
import moonBordered from "../../assets/moon-bordered.svg";
import moon from "../../assets/moon.svg";

function Navbar({ darkMode, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">

          <h1 className="brand-title semibold-text">The Flag App</h1>
          <img
            src={darkMode ? logoLight : logoDark}
            alt="Techover logo"
            className="logo"
          />

        <div className="navbar-actions">
          {/* Endast ikon som indikator (inte klickbar) */}
          <img
            src={darkMode ? moon : moonBordered}
            alt=""
            className="icon"
          />
          {/* Knapp som togglar tema */}
          <button type="button" className="toggle-btn semibold-text" onClick={onToggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
