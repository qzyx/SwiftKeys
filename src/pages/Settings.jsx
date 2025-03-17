import React, { useEffect } from "react";
import ThemeSelector from "../components/ThemeSelector";
import { useSelector } from "react-redux";
import { themes } from "../assets/themes/themes";
import useSettings from "../hooks/useSettings";

export default function Settings() {
  const theme = useSettings();

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
