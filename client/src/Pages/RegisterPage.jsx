import { useState, useEffect } from 'react';
import { Mail, Lock, UserPlus, Wrench, Moon, Sun, User, FileText } from 'lucide-react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from '../schemas/authSchema';
import { Message } from '../Components/ui/Message';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("value", data);
    setLoading(true);
    setTimeout(() => {
      signup(data);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);

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
  }, [darkMode]);

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

  return (
    <>
      <div className={`w-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}>
        <div className="w-full max-w-md mx-auto">
          {/* Dark mode toggle */}
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${darkMode
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
            <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
              <Wrench className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
              }`}>Crear una cuenta</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Regístrate para acceder a tu taller mecánico
            </p>
          </div>

          {/* Registration Form */}
          <div className={`rounded-xl shadow-md p-6 border ${darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>

            {registerErrors?.length > 0 && registerErrors.map((error, index) => (
              <Message key={index} type="error" message={error} className="mb-4" />
            ))}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* RUT */}
              <div>
                <label
                  htmlFor="rut"
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
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
                    {...register("rut", { 
                      required: true,
                      onChange: (e) => {
                        e.target.value = formatRut(e.target.value);
                      } 
                    })}
                    required
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
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
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
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
                    {...register("nombre", { required: true })}
                    required
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
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
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
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
                    {...register("apellidoPaterno", { required: true })}
                    required
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
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
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
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
                    {...register("apellidoMaterno", { required: true })}
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
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
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
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
                    {...register("email", { required: true })}
                    required
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                      }`}
                    placeholder="ejemplo@taller.com"
                  />
                </div>
              </div>

              {/* Dirección */}
              <div>
                <label
                  htmlFor="direccion"
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                  Dirección *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="direccion"
                    name="direccion"
                    type="text"
                    {...register("direccion", { required: true })}
                    required
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                      }`}
                    placeholder="Av. Libertador Bernardo O'Higgins 1234"
                  />
                </div>
              </div>

              {/* Numero */}
              <div>
                <label
                  htmlFor="numerotel"
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                  Numero Telefonico *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="numerotel"
                    name="numerotel"
                    type="number"
                    {...register("numerotel", { required: true })}
                    required
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                      }`}
                      placeholder='+56912345678'
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
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
                    {...register("password", { required: true })}
                    required
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
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
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
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
                    {...register("confirmPassword", { required: true })}
                    required
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${'focus:ring-blue-500'
                      } ${darkMode
                        ? `bg-gray-700 border ${'border-gray-600'} text-white placeholder-gray-400`
                        : `border ${'border-gray-300'} text-gray-900 placeholder-gray-500`
                      }`}
                    placeholder="••••••••"
                  />
                </div>
                {registerErrors?.length > 0 && registerErrors.confirmPassword?.message (
                  <p className="text-red-500">{registerErrors.confirmPassword?.message}</p>
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
                  className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                  Acepto los{' '}
                  <a
                    href="#"
                    className={`${darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
                      }`}
                  >
                    términos y condiciones
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all mt-6 ${darkMode
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(loading) ? 'opacity-70 cursor-not-allowed' : ''
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
                  className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
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
                className={`${darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
                  }`}
              >
                Términos de servicio
              </a>{' '}
              y{' '}
              <a
                href="#"
                className={`${darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
                  }`}
              >
                Política de privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}