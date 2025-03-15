import React, { useState } from "react";
import ThemeCard from "./ThemeCard";
import { themes } from "../assets/themes/themes";

export default function ThemeSelector() {
  // Sample themes array - replace with your actual themes

  const [activeTheme, setActiveTheme] = useState("Default");

  const handleThemeSelect = (theme) => {
    setActiveTheme(theme.name);
    // Add your theme changing logic here
    console.log(`Theme selected: ${theme.name}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-primary font-karantina text-2xl mb-4">
        Select Theme
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.name}
            theme={theme}
            isActive={theme.name === activeTheme}
            onClick={handleThemeSelect}
          />
        ))}
      </div>
    </div>
  );
}
