import React, { useEffect } from "react";
import ThemeSelector from "../components/ThemeSelector";
import { useSelector } from "react-redux";
import { themes } from "../assets/themes/themes";

export default function Settings() {
  const theme = useSelector((state) => state.settings.theme);
  useEffect(() => {
    const { primary, secondary, tertiary, background } = themes.find(
      (t) => t.name === theme
    ).colors;

    document.documentElement.style.setProperty(
      "--color-background",
      background
    );
    document.documentElement.style.setProperty("--color-primary", primary);
    document.documentElement.style.setProperty("--color-secondary", secondary);
    document.documentElement.style.setProperty("--color-tertiary", tertiary);
  }, [theme]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-primary font-karantina text-3xl mb-6">Settings</h1>
      <div className="bg-secondary p-4 rounded-lg shadow-md"></div>
      <div className="bg-secondary p-4 mt-6 rounded-lg shadow-md">
        <ThemeSelector />
      </div>

      {/* Other settings sections can go here */}
    </div>
  );
}
