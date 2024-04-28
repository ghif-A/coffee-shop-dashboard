import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "🔆"}
      </button>
    </div>
  );
};

export default ThemeToggle;
