import { useState, useEffect } from 'react';
import { Mail, Lock, UserPlus, Wrench, Moon, Sun, User, FileText } from 'lucide-react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  
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

  // Establecer el color de fondo inicial
  useEffect(() => {
    // Asegurar que el body ocupe todo el espacio
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Color de fondo inicial
    if (darkMode) {
      document.body.className = 'bg-gray-900';
    } else {
      document.body.className = 'bg-gradient-to-br from-gray-50 to-gray-100';
    }
  }, []);

  // Verificar que las contraseñas coincidan
  useEffect(() => {
    if (formData.password === '' && formData.confirmPassword === '') {
      setPasswordMatch(true);
      return;
    }
    
    if (formData.confirmPassword !== '' && formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    setLoading(true);
    
    // Simulación de registro
    setTimeout(() => {
      if (formData.rut && formData.nombre && formData.apellidoPaterno && 
          formData.email && formData.password) {
        // Aquí iría la lógica real de registro
        console.log('Registrando usuario:', formData);
      } else {
        setError('Por favor complete todos los campos obligatorios');
      }
      setLoading(false);
    }, 1000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Formatear RUT chileno (XX.XXX.XXX-X)
  const formatRut = (value) => {
    // Eliminar cualquier caracter que no sea número o K/k
    let cleaned = value.replace(/[^0-9kK]/g, '');
    
    // Formatear el RUT
    if (cleaned.length > 1) {
      // Separar el dígito verificador
      const body = cleaned.slice(0, -1);
      const dv = cleaned.slice(-1).toUpperCase();
      
      // Formatear el cuerpo del RUT
      let formatted = '';
      for (let i = body.length - 1; i >= 0; i--) {
        formatted = body[i] + formatted;
        if ((body.length - i) % 3 === 0 && i !== 0) {
          formatted = '.' + formatted;
        }
      }
      
      return `${formatted}-${dv}`;
    }
    
    return cleaned;
  };

  const handleRutChange = (e) => {
    const { value } = e.target;
    const formattedRut = formatRut(value);
    setFormData({
      ...formData,
      rut: formattedRut
    });
  };

  return (
    <div className={`w-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className="w-full max-w-md mx-auto">
        {/* Dark mode toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${
              darkMode 
                ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
            darkMode ? 'bg-blue-900' : 'bg-blue-100'
          }`}>
            <Wrench className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Crear una cuenta</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Regístrate para acceder a tu taller mecánico
          </p>
        </div>
        
        {/* Registration Form */}
        <div className={`rounded-xl shadow-md p-6 border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {error && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              darkMode 
                ? 'bg-red-900 border border-red-800 text-red-200' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* RUT */}
            <div>
              <label 
                htmlFor="rut" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                RUT *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="rut"
                  name="rut"
                  type="text"
                  value={formData.rut}
                  onChange={handleRutChange}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                  }`}
                  placeholder="12.345.678-9"
                />
              </div>
            </div>
            
            {/* Nombre */}
            <div>
              <label 
                htmlFor="nombre" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Nombre *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                  }`}
                  placeholder="Juan"
                />
              </div>
            </div>
            
            {/* Apellido Paterno */}
            <div>
              <label 
                htmlFor="apellidoPaterno" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Apellido Paterno *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  type="text"
                  value={formData.apellidoPaterno}
                  onChange={handleInputChange}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                  }`}
                  placeholder="Pérez"
                />
              </div>
            </div>
            
            {/* Apellido Materno */}
            <div>
              <label 
                htmlFor="apellidoMaterno" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Apellido Materno
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  type="text"
                  value={formData.apellidoMaterno}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                  }`}
                  placeholder="Gómez"
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Correo electrónico *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                  }`}
                  placeholder="ejemplo@taller.com"
                />
              </div>
            </div>
            
            {/* Contraseña */}
            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Contraseña *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Mínimo 8 caracteres, incluyendo una letra mayúscula y un número
              </p>
            </div>
            
            {/* Confirmar Contraseña */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Confirmar Contraseña *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                    !passwordMatch ? 'focus:ring-red-500 border-red-300' : 'focus:ring-blue-500'
                  } ${
                    darkMode 
                      ? `bg-gray-700 border ${!passwordMatch ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400` 
                      : `border ${!passwordMatch ? 'border-red-300' : 'border-gray-300'} text-gray-900 placeholder-gray-500`
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {!passwordMatch && (
                <p className={`text-xs mt-1 ${darkMode ? 'text-red-400' : 'text-red-500'}`}>
                  Las contraseñas no coinciden
                </p>
              )}
            </div>
            
            <div className="flex items-center mt-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label 
                htmlFor="terms" 
                className={`ml-2 block text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Acepto los{' '}
                <a 
                  href="#" 
                  className={`${
                    darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
                  }`}
                >
                  términos y condiciones
                </a>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading || !passwordMatch}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all mt-6 ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                (!passwordMatch || loading) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                <span className="inline-flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Crear cuenta
                </span>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ¿Ya tienes una cuenta?{' '}
              <a 
                href="/login" 
                className={`font-medium ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
        
        {/* Footer note */}
        <div className="mt-6 text-center">
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Al registrarte, aceptas nuestros{' '}
            <a 
              href="#" 
              className={`${
                darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
              }`}
            >
              Términos de servicio
            </a>{' '}
            y{' '}
            <a 
              href="#" 
              className={`${
                darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
              }`}
            >
              Política de privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}