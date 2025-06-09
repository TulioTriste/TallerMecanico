import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  return context;
};

export function DarkModeProvider({ children }) {
  // Inicializar el estado desde localStorage o preferencia del sistema
  const [darkMode, setDarkMode] = useState(() => {
    // Primero intentar obtener de localStorage
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    // Si no hay valor en localStorage, usar preferencia del sistema
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Actualizar el tema cuando cambie darkMode
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
    }

    // Guardar en localStorage
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        setDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContext;
