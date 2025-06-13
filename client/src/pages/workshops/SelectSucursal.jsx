import {useNavigate} from 'react-router-dom';
import {Building2, Users} from 'lucide-react';
import {useDarkMode} from "../../context/darkModeContext.jsx";

export default function SeleccionSucursal() {
  const navigate = useNavigate();
  const {darkMode} = useDarkMode();

  // Ejemplo de sucursales - Reemplazar con datos reales de tu API
  const sucursales = [
    {id: 1, nombre: 'Taller Central', direccion: 'Av. Principal 123', empleados: 15},
    {id: 2, nombre: 'Taller Norte', direccion: 'Calle Norte 456', empleados: 8},
  ];

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 pt-20 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
              darkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <Building2 className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}/>
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Seleccionar Sucursal
            </h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Selecciona una sucursal para ver sus empleados
            </p>
          </div>
        </div>

        {/* Grid de Sucursales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sucursales.map((sucursal) => (
            <button
              key={sucursal.id}
              onClick={() => navigate(`/empleados/sucursal/${sucursal.id}`)}
              className={`p-6 rounded-xl shadow-md transition-all transform hover:scale-105 ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Building2 className={`w-6 h-6 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}/>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2"/>
                  <span className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {sucursal.empleados}
                  </span>
                </div>
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {sucursal.nombre}
              </h2>
              <p className={`${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {sucursal.direccion}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}