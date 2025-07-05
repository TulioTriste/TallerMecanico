import { useState } from "react";
import {
  FileText,
  Home,
  Info,
  LogIn,
  Menu,
  Moon,
  Sun,
  Wrench,
  X,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useDarkMode } from "../../context/darkModeContext";
import logoTaller from "../../assets/logo-taller-modif.png";

export default function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 shadow-lg shadow-gray-900/50"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y enlaces de navegación desktop */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div
                className={`flex items-center ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              >
                <img
                  src={logoTaller}
                  alt="Logo Taller"
                  className="h-8 w-8 mr-2"
                />
                <span
                  className={`font-bold text-xl ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  TallerConectados
                </span>
              </div>
            </div>

            {/* Navegación - Desktop */}
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
              <a
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home className="w-4 h-4 mr-1.5" />
                Dashboard
              </a>
              <a
                href="/plans"
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FileText className="w-4 h-4 mr-1.5" />
                Planes
              </a>
              <a
                href="/sobre-software"
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Info className="w-4 h-4 mr-1.5" />
                Sobre el Software
              </a>
            </div>
          </div>

          {/* Opciones de la derecha */}
          <div className="flex items-center">
            {/* Botón de Tema */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg mr-4 ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Login - Desktop */}
            <div className="hidden md:ml-4 md:flex md:items-center">
              <a
                href={isLoginPage ? "/register" : "/login"}
                className={`ml-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                }`}
              >
                <span className="flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  {isLoginPage ? "Registrarse" : "Iniciar sesión"}
                </span>
              </a>
            </div>

            {/* Botón menú móvil */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="sr-only">Abrir menú principal</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div
          className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <a
            href="/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              darkMode
                ? "text-white hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </span>
          </a>
          <a
            href="/planes"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              darkMode
                ? "text-white hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Planes
            </span>
          </a>
          <a
            href="/sobre-software"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              darkMode
                ? "text-white hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Sobre el Software
            </span>
          </a>

          {/* Login - Mobile */}
          <div className="pt-2">
            <a
              href="/login"
              className={`block w-full px-4 py-2 rounded-lg text-center text-sm font-medium transition-all ${
                darkMode
                  ? "bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              }`}
            >
              <span className="flex items-center justify-center">
                <LogIn className="w-5 h-5 mr-2" />
                Iniciar sesión
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
