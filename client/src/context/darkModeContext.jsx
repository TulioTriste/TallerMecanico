import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("useDarkMode must be used within a DarkModeProvider");
  return context;
};

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(matchMedia.matches);

    // Escuchar cambios en el tema del sistema
    const handler = (e) => setDarkMode(e.matches);
    matchMedia.addEventListener('change', handler);

    return () => matchMedia.removeEventListener('change', handler);
  }, [setDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContext;