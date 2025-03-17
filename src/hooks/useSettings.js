import { useEffect } from "react";
import { useSelector } from "react-redux";
import { themes } from "../assets/themes/themes";

export default function useSettings() {
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

  return theme;
}
