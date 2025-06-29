import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext"; // Corregir la ruta con ../../

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Verificar si el usuario ya aceptó las cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div
        className={`p-4 ${
          darkMode
            ? "bg-gray-800 border-t border-gray-700"
            : "bg-white border-t border-gray-200"
        } shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Uso de Cookies
              </h3>
              <p
                className={`mt-1 text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Utilizamos cookies propias y de terceros para mejorar nuestros
                servicios y mostrarle publicidad relacionada con sus
                preferencias mediante el análisis de sus hábitos de navegación.
                Si continúa navegando, consideramos que acepta su uso. Puede
                obtener más información en nuestra política de cookies.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleAccept}
                className={`px-6 py-2 rounded-lg font-medium ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } transition-colors`}
              >
                Aceptar todas
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
