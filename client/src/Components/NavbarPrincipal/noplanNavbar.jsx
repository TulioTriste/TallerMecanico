import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Wrench, LogOut, Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useDarkMode } from "../../context/darkModeContext";
import logo from "../../assets/logo-taller.png";

function isNoPlan(plan_id) {
  return (
    plan_id === null ||
    plan_id === undefined ||
    plan_id === 0 ||
    plan_id === "0" ||
    plan_id === "" ||
    plan_id === false ||
    plan_id === "null"
  );
}

export default function NoPlanNavbar() {
  const { user, logout } = useAuth();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user || user.userType !== "usuario" || !isNoPlan(user.plan_id)) {
    return null;
  }

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
          {/* Logo y navegación desktop */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Wrench className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" />
              <span
                className={`font-bold text-xl ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                TallerConectados
              </span>
            </div>
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
              <Link
                to="/plans"
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Planes
              </Link>
              <Link
                to="/sobre-software"
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Sobre el software
              </Link>
            </div>
          </div>
          {/* Perfil y menú móvil */}
          <div className="flex items-center">
            {/* Perfil - Desktop */}
            <div className="hidden md:flex items-center">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    darkMode
                      ? "text-white hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {user?.nombre?.[0] || "U"}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {user?.nombre || "Usuario"}
                  </span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {showProfileMenu && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <button
                      onClick={logout}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Botón menú móvil */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="sr-only">Abrir menú principal</span>
                {isMenuOpen ? (
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
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div
          className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <Link
            to="/plans"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              darkMode
                ? "text-white hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Planes
          </Link>
          <Link
            to="/sobre-software"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              darkMode
                ? "text-white hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre el software
          </Link>
          <button
            onClick={logout}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              darkMode
                ? "text-white hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LogOut className="w-4 h-4 inline mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
