import { useState, useEffect } from 'react';
import { Mail, ArrowLeft, Wrench, Send } from 'lucide-react';
import { useDarkMode } from '../context/darkModeContext';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext.jsx";
import {sendResetPasswordRequest} from "../api/auth.js";

export default function RecoverPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { darkMode } = useDarkMode();

  const { isValidEmail } = useAuth();
  const [sentEmail, setSentEmail] = useState('');
  const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit = async (data) => {
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (await isValidEmail(data)) {
        const res = await sendResetPasswordRequest(data);
        if (res.status !== 200) {
          setError('Error al enviar el correo de recuperación. Inténtalo de nuevo más tarde.');
          return;
        }

        setSentEmail(data.correo);
        setSuccess(true);
      } else {
        setError('Este correo no existe.');
      }
    } catch (err) {
      setError('Error al enviar el correo de recuperación. Inténtalo de nuevo más tarde.');
      console.error('Error al enviar el correo de recuperación:', err);
    } finally {
      setLoading(false);

      if (!success) {
        setSentEmail('');
      }
    }
  };

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

  return (
    <div className={`w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
            darkMode ? 'bg-blue-900' : 'bg-blue-100'
          }`}>
            <Wrench className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Recuperar contraseña</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Te enviaremos instrucciones para restablecer tu contraseña
          </p>
        </div>
        
        {/* Recover Password Form */}
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
          
          {success ? (
            <div className={`text-center py-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
                darkMode ? 'bg-green-900' : 'bg-green-100'
              }`}>
                <Send className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">¡Correo enviado!</h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Hemos enviado las instrucciones de recuperación a:<br/>
                <span className="font-medium">{sentEmail}</span>
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Si no lo encuentras, revisa tu carpeta de spam o correo no deseado.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
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
                    required
                    {...register('correo', { required: true })}
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' 
                        : 'border border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="ejemplo@taller.com"
                  />
                </div>
                <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Ingresa el correo electrónico asociado con tu cuenta
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
                  darkMode
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
                    Enviando...
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Enviar instrucciones
                  </span>
                )}
              </button>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <a 
              href="/login" 
              className={`inline-flex items-center text-sm font-medium ${
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver al inicio de sesión
            </a>
          </div>
        </div>
        
        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Si continúas teniendo problemas, contacta a{' '}
            <a 
              href="#" 
              className={`${
                darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
              }`}
            >
              soporte técnico
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}