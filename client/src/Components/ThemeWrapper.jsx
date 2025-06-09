import { useEffect } from "react";
import { useDarkMode } from "../context/darkModeContext";

export function ThemeWrapper({ children }) {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
    }
  }, [darkMode]);

  return <div className={darkMode ? "dark" : ""}>{children}</div>;
}
