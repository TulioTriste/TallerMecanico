import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Moon, 
  Sun,
  Building2,
  Search
} from 'lucide-react';
import { useControlPanel } from '../context/controlPanelContext';

export default function ListaEmpleados() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage?.getItem('darkMode');
      return savedMode === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const { getEmpleadosByTaller } = useControlPanel();
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    // Simulación de fetch de empleados por sucursal
    const fetchEmpleados = async () => {
      try {
        // Aquí deberías hacer la llamada a tu API para obtener los empleados
        const res = await getEmpleadosByTaller(id);
        setEmpleados(res);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    }

    fetchEmpleados();
  }, []);

  // Datos de ejemplo - Reemplazar con fetch real
  /*const [empleados] = useState([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      rut: '12.345.678-9',
      correo: 'juan@taller.com',
      celular: '+56912345678',
      rol: 'Mecánico',
      sucursalId: 1,
      taller: 'Taller Central'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'González',
      rut: '98.765.432-1',
      correo: 'maria@taller.com',
      celular: '+56987654321',
      rol: 'Administrador',
      sucursalId: 1,
      taller: 'Taller Central'
    }
  ]);*/

  // Filtrar empleados por sucursal y término de búsqueda
  const empleadosFiltrados = empleados
    .filter(emp => 
      emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empleado_rut.includes(searchTerm)
    );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <div className={`min-h-screen pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
              darkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <Users className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Gestión de Empleados
            </h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Administra los empleados del taller
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => window.location.href = `/workshop/sucursal/${id}/nuevo`}
              className={`flex items-center px-4 py-2 rounded-lg text-white font-medium transition-all ${
                darkMode
                  ? 'bg-blue-700 hover:bg-blue-800'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Nuevo Empleado
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o RUT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Tabla de Empleados */}
        <div className={`rounded-xl shadow-md overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}>Empleado</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}>RUT</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}>Contacto</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}>Rol</th>
                <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}>Acciones</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              darkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {empleadosFiltrados.map((empleado) => (
                <tr key={empleado.empleado_rut} className={
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }>
                  <td className={`px-6 py-4 whitespace-nowrap ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <span className="text-xl">{empleado.nombre.charAt(0).toUpperCase()} {empleado.apellido.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="ml-4">
                        <div className={`font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{empleado.nombre} {empleado.apellido}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {empleado.empleado_rut}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    <div>{empleado.correo}</div>
                    <div>{empleado.cel}</div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {empleado.nombre_rol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => window.location.href = `/empleados/editar/${empleado.id}`}
                      className={`inline-flex items-center p-2 rounded-lg mr-2 ${
                        darkMode
                          ? 'text-blue-400 hover:bg-blue-900'
                          : 'text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
                          // Lógica para eliminar
                        }
                      }}
                      className={`inline-flex items-center p-2 rounded-lg ${
                        darkMode
                          ? 'text-red-400 hover:bg-red-900'
                          : 'text-red-600 hover:bg-red-100'
                      }`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}