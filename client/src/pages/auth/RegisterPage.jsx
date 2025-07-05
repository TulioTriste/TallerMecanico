import {useEffect, useState} from 'react';
import {FileText, Lock, Mail, User, UserPlus, Wrench} from 'lucide-react';
import {useAuth} from '../../context/authContext.jsx';
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from '../../schemas/authSchema.js';
import {useDarkMode} from '../../context/darkModeContext.jsx';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const {signup, errors: registerErrors, isAuthenticated} = useAuth();
  const {darkMode, toggleDarkMode} = useDarkMode();
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors: formErrors},
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  // Formatear RUT chileno (XX.XXX.XXX-X)
  const formatRut = (value) => {
    let cleaned = value.replace(/[^0-9kK]/g, '');
    if (cleaned.length > 1) {
      const body = cleaned.slice(0, -1);
      const dv = cleaned.slice(-1).toUpperCase();
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

  // Mejor formato de teléfono: +56 9 7219 6207 (input), guardar 56972196207 (output)
  const formatPhoneInput = (value) => {
    let cleaned = value.replace(/[^0-9]/g, "");
    if (cleaned.startsWith("56")) cleaned = cleaned.slice(2);
    if (cleaned.startsWith("9")) cleaned = cleaned;
    else if (cleaned.length > 0) cleaned = "9" + cleaned;
    let formatted = "";
    if (cleaned.length > 0) {
      formatted += cleaned[0] + " ";
    }
    if (cleaned.length > 1) {
      formatted += cleaned.slice(1, 5);
    }
    if (cleaned.length > 5) {
      formatted += " " + cleaned.slice(5, 9);
    }
    return formatted.trim();
  };

  const getPhoneForDB = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  const onSubmitPersonal = (data) => {
    // Validar que todos los campos requeridos estén presentes
    if (!data.rut || !data.nombre || !data.apellido || !data.correo || !data.direccion || !data.telefono) {
      return;
    }
    setPersonalData(data);
    setStep(2);
  };

  const onSubmitPassword = async (data) => {
    setLoading(true);
    try {
      const allData = {...personalData, ...data};
      allData.telefono = getPhoneForDB(allData.telefono);
      await signup(allData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}
      style={{ paddingTop: '3.5rem' }}
    >
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
            <Wrench className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}/>
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Crear una cuenta</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Regístrate para acceder a tu taller mecánico</p>
        </div>

        {/* Formulario completo en una sola plana */}
        <div className={`rounded-xl shadow-md p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-4">
            {/* RUT */}
            <div>
              <label htmlFor="rut" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>RUT *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}/>
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
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' : 'border-gray-300 text-gray-900 placeholder-gray-500 border'}`}
                  placeholder="12.345.678-9"
                />
              </div>
            </div>
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nombre *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}/>
                </div>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  {...register("nombre", {required: true})}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' : 'border-gray-300 text-gray-900 placeholder-gray-500 border'}`}
                  placeholder="Juan"
                />
              </div>
            </div>
            {/* Apellido Paterno */}
            <div>
              <label htmlFor="apellidoPaterno" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Apellido Paterno *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}/>
                </div>
                <input
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  type="text"
                  {...register("apellido", {required: true})}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' : 'border-gray-300 text-gray-900 placeholder-gray-500 border'}`}
                  placeholder="Pérez"
                />
              </div>
            </div>
            {/* Apellido Materno */}
            <div>
              <label htmlFor="apellidoMaterno" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Apellido Materno</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}/>
                </div>
                <input
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  type="text"
                  {...register("apellidoMaterno", {required: true})}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' : 'border-gray-300 text-gray-900 placeholder-gray-500 border'}`}
                  placeholder="Gómez"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Correo electrónico *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}/>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("correo", {required: true})}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' : 'border-gray-300 text-gray-900 placeholder-gray-500 border'}`}
                  placeholder="ejemplo@taller.com"
                />
              </div>
            </div>
            {/* Dirección */}
            <div>
              <label htmlFor="direccion" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dirección *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}/>
                </div>
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  {...register("direccion", {required: true})}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' : 'border-gray-300 text-gray-900 placeholder-gray-500 border'}`}
                  placeholder="Av. Libertador Bernardo O'Higgins 1234"
                />
              </div>
            </div>
            {/* Numero Telefonico */}
            <div>
              <label htmlFor="numerotel" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Número Telefónico *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 select-none font-bold text-blue-700 dark:text-blue-400">+56</span>
                <input
                  id="numerotel"
                  name="numerotel"
                  type="tel"
                  autoComplete="off"
                  {...register("telefono", {
                    required: true,
                    onChange: (e) => {
                      let val = e.target.value.replace(/[^0-9]/g, "");
                      if (val.startsWith("56")) val = val.slice(2);
                      if (val.startsWith("9")) val = val;
                      else if (val.length > 0) val = "9" + val;
                      let formatted = "";
                      if (val.length > 0) formatted += val[0] + " ";
                      if (val.length > 1) formatted += val.slice(1, 5);
                      if (val.length > 5) formatted += " " + val.slice(5, 9);
                      e.target.value = formatted.trim();
                    }
                  })}
                  required
                  className={`block w-full pl-14 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' : 'border-gray-300 text-gray-900 placeholder-gray-500 border'}`}
                  placeholder="9 7219 6207"
                  maxLength={10}
                />
              </div>
            </div>
            {/* Contraseña */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contraseña *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}/>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {required: true})}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' : 'border-gray-300 text-gray-900 placeholder-gray-500 border'}`}
                  placeholder="********"
                />
              </div>
            </div>
            {/* Repetir Contraseña */}
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Repetir Contraseña *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}/>
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {required: true})}
                  required
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border' : 'border-gray-300 text-gray-900 placeholder-gray-500 border'}`}
                  placeholder="********"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all mt-6 ${darkMode
                ? 'bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {loading ? 'Cargando...' : 'Crear Cuenta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}