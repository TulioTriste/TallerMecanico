import { useDarkMode } from "../../context/darkModeContext";
import { Home, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${
            darkMode ? "bg-red-900/5" : "bg-red-100/20"
          } blur-3xl`}
        ></div>
        <div
          className={`absolute top-1/2 -left-48 w-96 h-96 rounded-full ${
            darkMode ? "bg-blue-900/5" : "bg-blue-100/20"
          } blur-3xl`}
        ></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center">
        <div
          className={`p-8 rounded-2xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-xl max-w-2xl w-full text-center`}
        >
          {/* Ícono de error */}
          <div className="mb-6">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                darkMode ? "bg-red-900/20" : "bg-red-100"
              }`}
            >
              <AlertCircle
                className={`w-8 h-8 ${
                  darkMode ? "text-red-400" : "text-red-600"
                }`}
              />
            </div>
          </div>

          {/* Mensaje de error */}
          <h1
            className={`text-5xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            404
          </h1>
          <h2
            className={`text-2xl font-semibold mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Página no encontrada
          </h2>
          <p
            className={`mb-8 text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } transition-colors`}
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </Link>
            <button
              onClick={() => window.history.back()}
              className={`px-6 py-3 rounded-lg w-full sm:w-auto ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              } transition-colors`}
            >
              Volver atrás
            </button>
          </div>
        </div>

        {/* Mensaje adicional */}
        <p
          className={`mt-8 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Si crees que esto es un error, por favor contacta al soporte técnico.
        </p>
      </div>
    </div>
  );
}
