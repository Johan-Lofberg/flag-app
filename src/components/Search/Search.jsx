import "./Search.css";

function SearchBar({ value, onChange, placeholder = "Sök land..." }) {
  return (
    <input
      className="search-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export default SearchBar;
