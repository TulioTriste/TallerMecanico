import { useState } from "react";
import { useDarkMode } from "../context/darkModeContext";
import { Monitor, Sun, Moon } from "lucide-react";

export default function Settings() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("appearance");
  const [selectedTheme, setSelectedTheme] = useState(
    darkMode ? "dark" : "light",
  );

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setDarkMode(theme === "dark");
    // Guardar en localStorage
    localStorage.setItem("darkMode", (theme === "dark").toString());
    // Aplicar clases
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
    }
  };

  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Gestiona las configuraciones de tu cuenta
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar de navegación */}
          <div className="md:col-span-1">
            <nav
              className={`space-y-1 ${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow`}
            >
              <button
                onClick={() => setActiveTab("appearance")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === "appearance"
                    ? darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-blue-50 text-blue-700"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Monitor className="w-5 h-5" />
                <span>Apariencia</span>
              </button>
            </nav>
          </div>

          {/* Panel de contenido */}
          <div
            className={`md:col-span-3 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow p-6`}
          >
            {activeTab === "appearance" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Configuración de Apariencia
                </h2>
                <p
                  className={`mb-6 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Personaliza cómo se ve la aplicación
                </p>

                <div className="space-y-4">
                  {/* Opción Light */}
                  <div
                    onClick={() => handleThemeChange("light")}
                    className={`p-4 rounded-lg cursor-pointer border-2 ${
                      selectedTheme === "light"
                        ? darkMode
                          ? "border-blue-500 bg-gray-700"
                          : "border-blue-500 bg-blue-50"
                        : darkMode
                          ? "border-gray-700 hover:border-gray-600"
                          : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Sun
                        className={`w-5 h-5 ${
                          selectedTheme === "light" ? "text-blue-500" : ""
                        }`}
                      />
                      <div>
                        <p className="font-medium">Claro</p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Apariencia clara para el día
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Opción Dark */}
                  <div
                    onClick={() => handleThemeChange("dark")}
                    className={`p-4 rounded-lg cursor-pointer border-2 ${
                      selectedTheme === "dark"
                        ? darkMode
                          ? "border-blue-500 bg-gray-700"
                          : "border-blue-500 bg-blue-50"
                        : darkMode
                          ? "border-gray-700 hover:border-gray-600"
                          : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Moon
                        className={`w-5 h-5 ${
                          selectedTheme === "dark" ? "text-blue-500" : ""
                        }`}
                      />
                      <div>
                        <p className="font-medium">Oscuro</p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Apariencia oscura para la noche
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
