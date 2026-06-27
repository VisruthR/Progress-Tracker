import "./Header.css";

function Header({ theme, toggleTheme }) {
  return (
    <header className="header-container">
      <h1>
        Progress <span>Tracker</span>
      </h1>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

export default Header;
