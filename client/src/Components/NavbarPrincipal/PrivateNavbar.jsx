import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Wrench,
  Building2,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Settings,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useDarkMode } from "../../context/darkModeContext";

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const {logout, user} = useAuth();
  const {darkMode} = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileWorkshops, setShowMobileWorkshops] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);

  // Talleres de prueba
  const workshopsList = [
    { id: 1, name: "Taller Mecánico Central" },
    { id: 2, name: "AutoService Express" },
    { id: 3, name: "Taller San Miguel" },
    { id: 4, name: "Mecánica Rápida" },
  ];

  // Cerrar menú al hacer clic fuera o cambiar de ruta
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    setShowProfileMenu(false);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

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
              <Link
                to="/dashboard"
                className={`flex items-center ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                <Wrench className="h-8 w-8 mr-2"/>
                <span
                  className={`font-bold text-xl ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  TallerApp
                </span>
              </Link>
            </div>

            {/* Navegación - Desktop */}
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
              <Link
                to="/workshops"
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Building2 className="w-4 h-4 mr-1.5"/>
                Mis Talleres
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
                  <div
                    className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {user?.nombre?.[0] || (user ? "C" : "U")}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {user
                      ? user.nombre
                        ? user.nombre
                        : "Cargando..."
                      : "Usuario"}
                  </span>
                  <ChevronDown className="w-4 h-4 ml-2"/>
                </button>

                {showProfileMenu && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 text-sm ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <User className="w-4 h-4 inline mr-2"/>
                      Mi Perfil
                    </Link>
                    <Link
                      to="/settings"
                      className={`block px-4 py-2 text-sm ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Settings className="w-4 h-4 inline mr-2"/>
                      Configuración
                    </Link>
                    <div
                      className={`h-px mx-2 ${
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <LogOut className="w-4 h-4 inline mr-2"/>
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
                  <X className="block h-6 w-6"/>
                ) : (
                  <Menu className="block h-6 w-6"/>
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
          {/* Sección Mis Talleres */}
          <div className="border-b border-gray-700 pb-2">
            <button
              onClick={() => setShowMobileWorkshops(!showMobileWorkshops)}
              className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium ${
                darkMode
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Mis Talleres
              </span>
              {showMobileWorkshops ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {showMobileWorkshops && (
              <div className="ml-7 mt-2 space-y-1">
                {workshopsList.map((workshop) => (
                  <Link
                    key={workshop.id}
                    to={`/workshop/${workshop.id}`}
                    className={`block px-3 py-2 rounded-md text-sm ${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {workshop.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sección Perfil */}
          <div className="pt-2">
            <button
              onClick={() => setShowMobileProfile(!showMobileProfile)}
              className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium ${
                darkMode
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {user?.nombre || "Usuario"}
              </span>
              {showMobileProfile ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {showMobileProfile && (
              <div className="ml-7 mt-2 space-y-1">
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Mi Perfil
                </Link>
                <Link
                  to="/settings"
                  className={`block px-3 py-2 rounded-md text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Configuración
                </Link>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
