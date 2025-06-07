import { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, Wrench, Moon, Sun } from 'lucide-react';
import Navbar from '../Components/NavbarPrincipal/PublicNavbar';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../schemas/authSchema';
import { Message } from '../Components/ui/Message';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { signin, errors: loginErrors, isAuthenticated, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signin(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user.plan_id !== undefined && user.plan_id !== null) {
        navigate("/workshops");
      } else {
        navigate("/workshops");
      }
    }
  }, [isAuthenticated, navigate, user]);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900');
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode]);

  useEffect(() => {
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    if (darkMode) {
      document.body.className = 'bg-gray-900';
    } else {
      document.body.className = 'bg-gradient-to-br from-gray-50 to-gray-100';
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Navbar />
      <div className={`w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}>
        <div className="w-full max-w-md mx-auto">
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

          <div className="text-center mb-10">
            <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
              <Wrench className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
              }`}>Bienvenido de nuevo</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Accede a tu cuenta para gestionar tu taller mecánico
            </p>
          </div>

          <div className={`rounded-xl shadow-md p-6 border ${darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
            }`}>
            {loginErrors?.length > 0 && loginErrors.map((error, i) => (
              <Message message={error} key={i} />
            ))}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    placeholder="ejemplo@taller.com"
                    {...register("correo", { required: true })}
                  />
                  <p>{errors.email?.message}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                  >
                    Contraseña
                  </label>
                  <a
                    href="/recoverPassword"
                    className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                      }`}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                      : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                      }`}
                    placeholder="••••••••"
                    {...register("password", { required: true, minLength: 6 })}
                  />
                  <p>{errors.password?.message}</p>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  {...register("rememberMe")}
                />
                <label
                  htmlFor="remember-me"
                  className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                  Recordar mi sesión
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${darkMode
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando...
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Iniciar sesión
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ¿No tienes una cuenta?{' '}
                <a
                  href="/register"
                  className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    }`}
                >
                  Regístrate ahora
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Al iniciar sesión, aceptas nuestros{' '}
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
