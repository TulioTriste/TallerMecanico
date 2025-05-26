import { useState, useEffect } from 'react';
import { Home, FileText, Info, LogIn, Menu, X, Wrench, Moon, Sun } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // Estado para el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Inicializar el estado de modo oscuro desde localStorage o la preferencia del sistema
  const [darkMode, setDarkMode] = useState(() => {
    // Primero intentamos obtener la preferencia guardada
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      
      // Si hay una preferencia guardada, usamos esa
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      
      // Si no hay preferencia guardada, detectamos la del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    // Solo si no hay una preferencia guardada manualmente
    if (typeof window !== 'undefined' && localStorage.getItem('darkMode') === null) {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleDarkModeChange = (event) => {
        setDarkMode(event.matches);
      };
      
      darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
      
      return () => {
        darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
      };
    }
  }, []);

  // Aplicar modo oscuro al body/html completo cuando cambia
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900');
    }
    
    // Guardar preferencia en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 shadow-lg shadow-gray-900/50' : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y enlaces de navegación desktop */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className={`flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <Wrench className="h-8 w-8 mr-2" />
                <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  TallerApp
                </span>
              </div>
            </div>
            
            {/* Navegación - Desktop */}
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
              <a 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  darkMode 
                    ? 'text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4 mr-1.5" />
                Dashboard
              </a>
              <a 
                href="/plans" 
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  darkMode 
                    ? 'text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4 mr-1.5" />
                Planes
              </a>
              <a 
                href="/acerca" 
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  darkMode 
                    ? 'text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Info className="w-4 h-4 mr-1.5" />
                Sobre el Software
              </a>
            </div>
          </div>
          
          {/* Opciones de la derecha */}
          <div className="flex items-center">
            
            {/* Login - Desktop */}
            <div className="hidden md:ml-4 md:flex md:items-center">
              <a
                href={isLoginPage ? "/register" : "/login"}
                className={`ml-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  darkMode
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                }`}
              >
                <span className="flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  {isLoginPage ? "Registrarse" : "Iniciar sesión"}
                </span>
              </a>
            </div>
            
            {/* Menu button - Mobile */}
            <div className="flex md:hidden ml-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                aria-expanded="false"
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
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          <a 
            href="/dashboard" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              darkMode 
                ? 'text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:bg-gray-100'
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
                ? 'text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Planes
            </span>
          </a>
          <a 
            href="/acerca" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              darkMode 
                ? 'text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:bg-gray-100'
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
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
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