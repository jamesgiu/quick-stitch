type AppHeaderProps = {
  darkMode: boolean;
  catMode: boolean;
  onToggleDarkMode: () => void;
  onToggleCatMode: () => void;
};

export const AppHeader = ({ darkMode, catMode, onToggleDarkMode, onToggleCatMode }: AppHeaderProps) => (
  <header className="app-header">
    <div className="brand-mark" aria-hidden="true">{catMode ? "🐱" : "QS"}</div>
    <div>
      <p className="eyebrow">{catMode ? "CAT PIXEL WORKSHOP" : "PIXEL WORKSHOP"}</p>
      <h1>QuickStitch</h1>
      <p className="header-subtitle">{catMode ? "Tiny paws, big patterns." : "A calm little space for making patterns."}</p>
    </div>
    <div className="theme-controls" aria-label="Display options">
      <button type="button" className={darkMode ? "theme-toggle active" : "theme-toggle"} onClick={onToggleDarkMode} aria-pressed={darkMode}>
        {darkMode ? "☀ Light" : "☾ Dark"}
      </button>
      <button type="button" className={catMode ? "theme-toggle active" : "theme-toggle"} onClick={onToggleCatMode} aria-pressed={catMode}>
        {catMode ? "🐾 Cats on" : "🐾 Cat mode"}
      </button>
    </div>
  </header>
);

export default AppHeader;
